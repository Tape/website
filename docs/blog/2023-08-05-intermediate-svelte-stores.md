---
date: 2023-08-05
title: "Intermediate Svelte: Stores"
---

While much of what Svelte provides seems like absolute magic, there are some things that it can't account for.
Reactivity is the driving force behind what performs updates on all front-end frameworks, and Svelte is no different.
Let's take a simple look at how Svelte handles reactivity for updates made outside components.

---

## Stores

Svelte has a module called [store](https://svelte.dev/docs/svelte-store) that can help assist writing plain JavaScript
code that can be reactive. We'll take a look at a simple example in the next section where we begin with a simple
JavaScript-only example and add the functionality required to make it perform reactive updates.

## Example

Below is the code for our externalized store, `$lib/store.ts`:
```ts
export default class Store {
    private value: number;

    public constructor(value: number) {
        this.value = value;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number) {
        this.value = value;
    }
}
```

Below is the code for our component, `$lib/components/Answer.svelte`:

```svelte
<script lang="ts">
    import Store from "$lib/store";
    
    const store = new Store(0);
</script>

<p>The answer to life is {store.getValue()}</p>
<button on:click={() => store.setValue(42)}>Real Answer</button>
```

Now that we have our boilerplate, we can try out our component. We'll see it renders the initial state properly,
however, once we click the button, the same text is displayed rather than updating the number to 42! Thankfully, we can
address this problem rather simply by making a few updates to use a Svelte store.

Let's begin with updates to our store class itself:
```ts
import { type Readable, writeable, type Writeable } from "svelte/store"; // [!code ++]
// [!code ++]
export default class Store {
    private value: number; // [!code --]
    private value: Writeable<number>; // [!code ++]

    public constructor(value: number) {
        this.value = value; // [!code --]
        this.value = writeable(value); // [!code ++]
    }

    public getValue(): number { // [!code --]
    public getValue(): Readable<number> { // [!code ++]
        return this.value;
    }

    public setValue(value: number) {
        this.value = value; // [!code --]
        this.value.set(value); // [!code ++]
    }
}
```

While types are obviously optional, I explicitly provided them to help understand what exactly is going on here. We wrap
our value with a writeable object, and this is what will allow us to notify a Svelte component of changes that occurred
outside the component ecosystem.

You'll also notice I am returning the `Writeable` as a `Readable`. Under the hood the reactive updates are performed via
subscriptions, which both `Writeable` and `Readable` are expected to return. TypeScript helps provide that extra bit of
safety to make sure the only thing with access to the writeable functionality is the owner(s) of the writeable.

Next, let's update our component:
```svelte
<script lang="ts">
    import Store from "$lib/store";
    
    const store = new Store(0);
    const value = store.getValue(); // [!code ++]
</script>

<p>The answer to life is {store.getValue()}</p> // [!code --]
<p>The answer to life is {$value}</p> // [!code ++]
<button on:click={() => store.setValue(42)}>Real Answer</button>
```

The changes here are actually extremely simple. We assign `getValue()` to a variable, which will enable us to have our
component subscribe to updates. We can see that enacted by using `$value`. There's a pattern with Svelte that anything
reactive typically is prefixed with a `$`, which makes it easy to point out things that may have some additional
behavior beyond just plain JavaScript.

## Conclusion

While much of what Svelte does is magic, it can't magically make external libraries work with your components. With some
fairly simple updates, you can add or wrap the necessary functionality in order to make that happen.

So far, I've really been enjoying the explicit nature of Svelte. It almost reminds me of KnockoutJS, which I felt like
really began the push with reactive web frameworks. I'll likely continue to blog about more advanced functionality, but
stores likely address the majority of common issues I've seen and will see so far.
