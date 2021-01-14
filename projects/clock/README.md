# Clock

This is just a test library for clock

## How to use it?
```html
<lib-main></lib-main>
```

## Available methods
```html
<lib-main (time)="getTime($event)">
</lib-main>
```

```javascript
getTime(value): void {
    console.log(value)
    // Produce somethin like this:
    // 17:14:46
}
```

