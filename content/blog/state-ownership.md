# Understanding State Ownership in Complex Frontends

For the longest time, whenever I needed to keep track of something in a React app, my first instinct was to put it in state.

Need to open a modal? `useState`.

Need to store a selected market? `useState`.

Need to keep some API data around? Fetch it, put it in `useState`.

And honestly, it works pretty fine until you start working on complex frontends.

I started noticing this while working on a trading interface. There was state everywhere: selected markets, order forms, wallet information, positions coming from APIs, filters that should survive navigation, transaction flows going through multiple steps, and values that were simply calculated from other values.

Technically, I could manage most of it with React state and a global store. But I started realizing that **"can I store this here?" and "does this state actually belong here?" are two very different questions.**

That's what pushed me to learn more about state ownership.

## The different kinds of state

There might be these states that could potentially be present in an app — Local state, Server state, Global state, URL state, Workflow state, and Derived state.

* **Local state** — temporary state owned by a small part of the UI
* **URL state** — state describing what the user is currently viewing, e.g. filters or selected market in trading UIs
* **Global state** — client-owned state that genuinely matters across the application
* **Server state** — remote data where the server remains the source of truth
* **Workflow state** — the current stage of a multi-step process, e.g. a deposit transaction
* **Derived state** — values that can be calculated from existing state, e.g. total order value

These categories aren't always mutually exclusive. A value might be needed across the application while still belonging in the URL, or server data might be used to calculate derived state.

The goal isn't necessarily to perfectly label every value. It's to figure out **where its source of truth should live.**

Before choosing the appropriate state, ask yourself:

```text
Did it come from a remote source?
→ Server State

Should the current view survive refresh / be shareable?
→ URL State

Is it describing a step in a process?
→ Workflow State

Can it be calculated from existing data?
→ Derived State

Do distant, unrelated parts of the app need the same client-owned value?
→ Global State

Otherwise, keep it as close as possible to where it's used.
→ Local State
```

## Implementation methods of such state

Once the type of state is clear, the implementation usually becomes much easier.

### 1. Local State

Local state is usually implemented with React primitives such as `useState` or `useReducer`.

```tsx
const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
```

Use it when the state belongs to one component or a small subtree.

Examples:

```tsx
const [isDropdownOpen, setDropdownOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState("overview");
```

The useful rule here is:

> Keep state as close as possible to the components that actually need it.

If only one feature cares about whether a modal is open, there is little reason to put that value into a global store.

Form inputs usually begin here as well. For more complex multi-step forms, some of that state may eventually become workflow state.

### 2. URL State

URL state lives in route parameters or search parameters.

For example:

```text
/trade/BTC?tab=positions&side=buy
```

In Next.js, this could be read using route params or search params:

```tsx
const params = useParams();
const searchParams = useSearchParams();

const market = params.market;
const tab = searchParams.get("tab");
```

This works well for state that should survive refreshes or be shareable.

Typical examples include:

```text
selected market
search query
filters
pagination
selected tab
```

Instead of:

```tsx
const [market, setMarket] = useState("BTC");
```

it may be better to let:

```text
/trade/BTC
```

be the source of truth.

### 3. Global State

Global state is commonly implemented using Context, Zustand, Redux, or another application-level store.

For example:

```tsx
const useAppStore = create((set) => ({
  theme: "dark",

  setTheme: (theme) =>
    set({
      theme,
    }),
}));
```

Then unrelated parts of the application can access the same state:

```tsx
const theme = useAppStore((state) => state.theme);
```

Useful global state might include:

```text
theme
current workspace
locale
application-wide preferences
```

But global state should be used carefully.

If only one component needs a value, making it globally accessible usually creates unnecessary coupling.

It's also worth checking whether another library already owns the state. For example, if a wallet library is already the source of truth for the connected wallet, duplicating that information into a global store may just create another value that needs to stay synchronized.

### 4. Server State

Server state is different because the frontend is **not the source of truth**.

For example, positions in a trading application might come from an API:

```tsx
const { data: positions } = useQuery({
  queryKey: ["positions", wallet.address],
  queryFn: () => fetchPositions(wallet.address),
});
```

A library such as TanStack Query or SWR can then handle concerns like:

```text
caching
loading state
errors
refetching
stale data
request deduplication
retries
```

This is usually better than manually doing:

```tsx
const [positions, setPositions] = useState([]);

useEffect(() => {
  fetchPositions().then(setPositions);
}, []);
```

because remote data has a lifecycle of its own.

It can change without the current component changing it, which means the frontend needs to think about **freshness and synchronization**, not just storage.

### 5. Workflow State

Workflow state represents where the user or system currently is inside a process.

For example:

```text
idle
↓
reviewing
↓
awaiting_signature
↓
submitting
↓
success
```

A simple implementation could be:

```tsx
const [orderStatus, setOrderStatus] =
  useState<
    "idle" | "reviewing" | "awaiting_signature" | "submitting" | "success"
  >("idle");
```

For more complex workflows, a reducer or state machine can make the transitions explicit.

For example:

```text
reviewing
   ↓
awaiting_signature
   ↓
submitting
   ├── success
   └── failed
```

This is often cleaner than managing several booleans such as:

```text
isSigning
isSubmitting
isSuccess
isFailed
```

because multiple booleans can accidentally create impossible combinations.

### 6. Derived State

Derived state usually should not be stored separately.

If you already have:

```tsx
const price = 100;
const quantity = 3;
```

then:

```tsx
const orderValue = price * quantity;
```

is enough.

Avoid:

```tsx
const [orderValue, setOrderValue] = useState(0);
```

and then synchronizing it manually whenever `price` or `quantity` changes.

The same idea applies to things like:

```tsx
const filteredMarkets = markets.filter(
  (market) => market.category === selectedCategory
);

const totalPnL = positions.reduce(
  (sum, position) => sum + position.pnl,
  0
);
```

If a value can be calculated from existing state, derive it instead of creating another source of truth.

If that calculation is expensive, it can be memoized:

```tsx
const totalPnL = useMemo(
  () => positions.reduce((sum, position) => sum + position.pnl, 0),
  [positions]
);
```

But `useMemo` here is an optimization — it doesn't make the value a new type of state.

## The real problem: duplicate sources of truth

One thing I started noticing is that many state management problems aren't necessarily caused by choosing the wrong library.

They're caused by storing the **same information in multiple places.**

Imagine the selected market exists in all three:

```text
URL market     → BTC
Global store   → ETH
Local state    → SOL
```

Now the application has to decide which one is correct and keep all three synchronized.

If the selected market already lives in:

```text
/trade/BTC
```

the URL can simply remain the source of truth instead of copying the same value into local and global state.

The less duplicated state we create, the less synchronization we have to manage.

## Putting it together in a trading interface

Going back to the trading interface example, different pieces of state might look something like this:

| Value | State |
| --- | --- |
| Confirm order modal | Local State |
| Selected market (`/trade/BTC`) | URL State |
| Orderbook | Server State |
| User positions | Server State |
| Theme | Global State |
| Deposit transaction step | Workflow State |
| Order value (`price × quantity`) | Derived State |

So instead of treating the trading screen as one large collection of React state, each value gets an owner based on its source of truth and lifecycle.

The implementation choice then becomes much easier:

```text
Local UI behavior
→ useState / useReducer

Shareable navigation state
→ URL / router

Cross-cutting client state
→ Context / Zustand / Redux

Remote data
→ TanStack Query / SWR

Multi-step process
→ useState / reducer / state machine

Calculated value
→ derive it directly
```

> The main lesson for me was that state management is less about finding one perfect library and more about **putting each piece of state in the place that matches its source of truth and lifecycle**.

The question I try to ask now isn't:

**"Which state management library should I use?"**

It's:

**"Who should own this value?"**

Once that answer is clear, the implementation usually becomes the easy part.
