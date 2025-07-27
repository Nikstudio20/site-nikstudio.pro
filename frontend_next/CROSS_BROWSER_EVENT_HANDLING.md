# Cross-Browser Event Handling Compatibility

This document describes the cross-browser event handling compatibility system that ensures consistent event behavior across Chrome, Firefox, Safari, and Edge browsers.

## Overview

The event compatibility system provides:

- **Unified Event Listeners**: Cross-browser event attachment and removal
- **Touch Event Compatibility**: Touch events with mouse fallbacks for mobile browsers
- **Keyboard Event Normalization**: Consistent keyboard event handling across browsers
- **Mouse Event Compatibility**: Normalized mouse events for older browsers
- **React Hooks**: Easy integration with React components

## Core Components

### 1. EventCompatibility

Base event handling with cross-browser support for older browsers including IE.

```typescript
import { EventCompatibility } from '@/lib/event-compatibility';

// Add event listener with automatic normalization
EventCompatibility.addEventListener(element, 'click', (event) => {
  console.log('Normalized event:', event);
  event.preventDefault();
  event.stopPropagation();
});

// Remove event listener
EventCompatibility.removeEventListener(element, 'click', handler);
```

### 2. TouchCompatibility

Touch event handling with mouse fallbacks for non-touch devices.

```typescript
import { TouchCompatibility } from '@/lib/touch-compatibility';

// Check touch support
if (TouchCompatibility.isTouchSupported()) {
  console.log('Touch events are supported');
}

// Add touch event listeners
TouchCompatibility.addTouchEventListener(element, 'tap', (data) => {
  console.log('Tap detected:', data.changedTouches);
});

TouchCompatibility.addTouchEventListener(element, 'swipe', (data) => {
  console.log('Swipe direction:', data.direction);
});

// Make element touch-friendly
TouchCompatibility.makeTouchFriendly(element);
```

### 3. KeyboardCompatibility

Keyboard event normalization with key combination support.

```typescript
import { KeyboardCompatibility } from '@/lib/keyboard-compatibility';

// Add keyboard event listener
KeyboardCompatibility.addKeyboardEventListener(element, 'keydown', (event) => {
  console.log('Key pressed:', event.key);
  console.log('Key code:', event.keyCode);
  console.log('Modifiers:', { ctrl: event.ctrlKey, alt: event.altKey });
});

// Add key combination listener
KeyboardCompatibility.addKeyCombinationListener(element, 'ctrl+c', (event) => {
  console.log('Copy shortcut detected');
  event.preventDefault();
});

// Enable keyboard navigation
KeyboardCompatibility.enableKeyboardNavigation(element);
```

### 4. MouseCompatibility

Mouse event normalization with enhanced functionality.

```typescript
import { MouseCompatibility } from '@/lib/mouse-compatibility';

// Add mouse event listener
MouseCompatibility.addMouseEventListener(element, 'click', (event) => {
  if (MouseCompatibility.isLeftButton(event)) {
    console.log('Left click at:', event.clientX, event.clientY);
  }
});

// Add double-click with fallback
MouseCompatibility.addDoubleClickListener(element, (event) => {
  console.log('Double-click detected');
});

// Add mouse wheel support
MouseCompatibility.addWheelListener(element, (event) => {
  console.log('Wheel delta:', event.deltaY);
});

// Enable drag functionality
MouseCompatibility.enableDrag(
  element,
  (event) => console.log('Drag start'),
  (event) => console.log('Dragging'),
  (event) => console.log('Drag end')
);
```

## React Integration

### Using Individual Hooks

```typescript
import { useTouchCompatibility, useKeyboardCompatibility } from '@/hooks/useEventCompatibility';

function MyComponent() {
  const touch = useTouchCompatibility<HTMLDivElement>();
  const keyboard = useKeyboardCompatibility<HTMLDivElement>();

  useEffect(() => {
    // Add touch events
    touch.addTouchEventListener('tap', (data) => {
      console.log('Tapped!');
    });

    // Add keyboard events
    keyboard.addKeyCombinationListener('ctrl+s', (event) => {
      console.log('Save shortcut');
      event.preventDefault();
    });
  }, [touch, keyboard]);

  return (
    <div ref={touch.ref}>
      <input ref={keyboard.ref} type="text" />
    </div>
  );
}
```

### Using Combined Hook

```typescript
import { useAllEventCompatibility } from '@/hooks/useEventCompatibility';

function InteractiveComponent() {
  const events = useAllEventCompatibility<HTMLButtonElement>();

  useEffect(() => {
    // Touch events
    events.addTouchEventListener('tap', (data) => {
      console.log('Button tapped');
    });

    // Keyboard events
    events.addKeyboardEventListener('keydown', (event) => {
      if (event.key === 'enter' || event.key === ' ') {
        console.log('Button activated via keyboard');
      }
    });

    // Mouse events
    events.addMouseEventListener('click', (event) => {
      console.log('Button clicked');
    });

    // Make touch-friendly and keyboard accessible
    events.makeTouchFriendly();
    events.enableKeyboardNavigation();
  }, [events]);

  return (
    <button ref={events.ref} className="interactive-button">
      Click, tap, or press Enter/Space
    </button>
  );
}
```

## Initialization

Initialize the event compatibility system in your app:

```typescript
import { initializeEventCompatibility } from '@/lib/event-compatibility';

// In your app initialization
initializeEventCompatibility();
```

This adds global styles and sets up input method detection for optimal focus handling.

## Utility Functions

### Event Delegation

```typescript
import { delegateEvent } from '@/lib/event-compatibility';

// Delegate events to child elements
delegateEvent(container, '.clickable', 'click', (event, target) => {
  console.log('Clicked element:', target);
});
```

### Debouncing and Throttling

```typescript
import { debounce, throttle } from '@/lib/event-compatibility';

// Debounce event handler
const debouncedHandler = debounce((event) => {
  console.log('Debounced event');
}, 300);

// Throttle event handler
const throttledHandler = throttle((event) => {
  console.log('Throttled event');
}, 100);
```

### Making Elements Accessible

```typescript
import { makeElementAccessible } from '@/lib/event-compatibility';

// Make any element accessible for all input methods
makeElementAccessible(element);
```

## Browser-Specific Handling

### Touch Events (Mobile Safari, Chrome Mobile)

```typescript
// Handle iOS Safari touch quirks
TouchCompatibility.addTouchEventListener(element, 'touchstart', (data) => {
  // Prevent default to avoid 300ms click delay
  data.preventDefault();
});

// Handle Android Chrome touch events
TouchCompatibility.preventTouchDefaults(element);
```

### Keyboard Events (Firefox, IE)

```typescript
// Handle Firefox key event differences
KeyboardCompatibility.addKeyboardEventListener(element, 'keydown', (event) => {
  // Normalized key codes work across all browsers
  if (event.keyCode === 13) { // Enter key
    console.log('Enter pressed');
  }
});
```

### Mouse Events (IE, Edge Legacy)

```typescript
// Handle IE mouse event quirks
MouseCompatibility.addMouseEventListener(element, 'click', (event) => {
  // Normalized button detection
  if (MouseCompatibility.isRightButton(event)) {
    console.log('Right click detected');
  }
});
```

## Best Practices

### 1. Always Use Normalized Events

```typescript
// ✅ Good - uses normalized events
KeyboardCompatibility.addKeyboardEventListener(element, 'keydown', (event) => {
  if (event.key === 'enter') {
    // Handle enter key
  }
});

// ❌ Bad - browser-specific behavior
element.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) { // May not work in all browsers
    // Handle enter key
  }
});
```

### 2. Provide Touch and Mouse Support

```typescript
// ✅ Good - supports both touch and mouse
TouchCompatibility.addTouchEventListener(element, 'tap', handleInteraction);

// ❌ Bad - only supports mouse
element.addEventListener('click', handleInteraction);
```

### 3. Enable Keyboard Navigation

```typescript
// ✅ Good - accessible to keyboard users
KeyboardCompatibility.enableKeyboardNavigation(button);

// ❌ Bad - not accessible
// No keyboard support
```

### 4. Handle All Input Methods

```typescript
// ✅ Good - comprehensive input support
const events = useAllEventCompatibility();

useEffect(() => {
  events.addTouchEventListener('tap', handleTap);
  events.addKeyboardEventListener('keydown', handleKeyboard);
  events.addMouseEventListener('click', handleClick);
}, [events]);
```

## Testing

The system includes comprehensive tests for all browsers:

```bash
# Run event compatibility tests
npm test -- event-compatibility.test.ts
```

Tests cover:
- Event listener attachment/removal
- Event normalization
- Touch event fallbacks
- Keyboard event normalization
- Mouse event compatibility
- React hook functionality

## Browser Support

### Primary Support (Full Features)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Secondary Support (Core Features)
- Chrome 80-89
- Firefox 78-87
- Safari 12-13
- Edge 79-89
- Internet Explorer 11 (basic support)

## Performance Considerations

- Event listeners are automatically cleaned up
- Touch detection is cached for performance
- Polyfills are only loaded when needed
- Event delegation reduces memory usage
- Debouncing and throttling prevent excessive calls

## Troubleshooting

### Touch Events Not Working
```typescript
// Check touch support
if (!TouchCompatibility.isTouchSupported()) {
  console.log('Touch not supported, using mouse fallbacks');
}
```

### Keyboard Events Not Normalized
```typescript
// Ensure you're using the compatibility layer
KeyboardCompatibility.addKeyboardEventListener(element, 'keydown', (event) => {
  console.log('Normalized key:', event.key); // Always lowercase
});
```

### Mouse Events Inconsistent
```typescript
// Use normalized mouse events
MouseCompatibility.addMouseEventListener(element, 'click', (event) => {
  console.log('Normalized button:', event.button); // 0, 1, or 2
});
```