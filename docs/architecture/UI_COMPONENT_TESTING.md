# UI Component Testing & Documentation Strategy

## Overview

This document explains our dual approach to UI component quality: **Storybook Stories** for visual documentation and **Vitest Tests** for functional validation. Both are essential but serve completely different purposes.

---

## Why Both Stories AND Tests?

### 📖 Storybook Stories - Visual Documentation

**Purpose:** Design system documentation and visual development

**What they provide:**

- **Visual catalog** of all component variants in isolation
- **Interactive playground** for exploring props and states
- **Usage documentation** with code examples
- **Visual regression testing** baseline (with tools like Chromatic)
- **Design consistency** verification across the app
- **Component API** documentation

**When you use them:**

- 🎨 Building new features (find the right component/variant)
- 👁️ Designing UI (explore all visual options)
- 📋 QA visual review (spot visual inconsistencies)
- 🆕 Onboarding developers (learn component APIs)
- 🎯 Design handoff (verify implementation matches design)

**Example: Button.stories.tsx**

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

// Shows all visual variants
export const Primary: Story = {
  args: { variant: "primary", children: "Primary Button" },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    icon: <CheckIcon className="w-4 h-4" />,
    children: "Save Changes",
  },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Loading..." },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Disabled" },
};
```

---

### 🧪 Vitest Tests - Functional Validation

**Purpose:** Ensure component behavior works correctly and prevent regressions

**What they validate:**

- **User interactions** (clicks, typing, keyboard navigation)
- **Accessibility** (ARIA attributes, screen reader support, keyboard access)
- **Conditional rendering** logic (what shows/hides based on props/state)
- **Props validation** (correct prop types, required props)
- **State management** (state changes, side effects)
- **Error handling** (edge cases, invalid inputs)
- **Event handlers** (callbacks fire correctly)

**When you use them:**

- ⚙️ CI/CD pipeline (automated quality checks)
- 🔄 TDD workflow (write test first, implement second)
- 🔧 Refactoring (ensure nothing breaks)
- 👀 Code review (verify expected behavior)
- 🐛 Bug fixes (write failing test, then fix)

**Example: Button.test.tsx**

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows loading spinner when loading", () => {
    render(<Button loading>Loading</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("disabled");
    // LoadingSpinner component should be visible
  });

  it("is keyboard accessible", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press me</Button>);

    const button = screen.getByRole("button");
    button.focus();
    fireEvent.keyDown(button, { key: "Enter" });

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("has correct ARIA attributes when disabled", () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });
});
```

---

## Real-World Comparison

| Aspect          | Storybook Stories                   | Vitest Tests                 |
| --------------- | ----------------------------------- | ---------------------------- |
| **Focus**       | How it LOOKS                        | How it WORKS                 |
| **Audience**    | Designers, Developers, QA           | Developers, CI/CD            |
| **Runs**        | Manually (dev server)               | Automatically (CI pipeline)  |
| **Output**      | Visual documentation                | Pass/fail results            |
| **Catches**     | Visual regressions, inconsistencies | Functional bugs, regressions |
| **Speed**       | Slow (requires browser)             | Fast (jsdom)                 |
| **Interaction** | Interactive exploration             | Automated assertions         |
| **Coverage**    | Visual variants                     | Code paths & edge cases      |

---

## Component Coverage Status

**Last Updated:** 2025-12-11

### Summary

- 📊 **27** UI components total
- 📖 **18** have Storybook stories (67% coverage)
- 🧪 **9** have tests (33% coverage)

### Components Missing Stories (10 components)

| Component          | Priority  | Reason                            |
| ------------------ | --------- | --------------------------------- |
| Form/Input         | 🔴 HIGH   | Core form component, heavily used |
| Form/Select        | 🔴 HIGH   | Core form component, heavily used |
| Form/Textarea      | 🔴 HIGH   | Core form component, heavily used |
| Form/Label         | 🟡 MEDIUM | Supporting form component         |
| Form/FieldError    | 🟡 MEDIUM | Supporting form component         |
| Form/FormField     | 🟡 MEDIUM | Form wrapper component            |
| Form/PasswordInput | 🟡 MEDIUM | Specialized input variant         |
| AILoadingSpinner   | 🟢 LOW    | Specialized, less reused          |
| AudioWaveform      | 🟢 LOW    | Specialized, less reused          |
| PlyrVideoPlayer    | 🟢 LOW    | Third-party wrapper               |
| toast              | 🟢 LOW    | Utility function, not visual      |

### Components Missing Tests (18 components)

| Component        | Priority  | Reason                                     |
| ---------------- | --------- | ------------------------------------------ |
| Button           | 🔴 HIGH   | Most used component, critical interactions |
| Form/Input       | 🔴 HIGH   | User input validation critical             |
| Form/Select      | 🔴 HIGH   | User input validation critical             |
| Form/Textarea    | 🔴 HIGH   | User input validation critical             |
| Modal            | 🔴 HIGH   | Complex component, focus management        |
| Form/FormField   | 🟡 MEDIUM | Wrapper with validation logic              |
| Card             | 🟡 MEDIUM | Common layout component                    |
| Badge            | 🟡 MEDIUM | Common display component                   |
| Chip             | 🟡 MEDIUM | New component (just created)               |
| Form/Label       | 🟡 MEDIUM | Accessibility critical                     |
| Form/FieldError  | 🟡 MEDIUM | Error display logic                        |
| Form/Checkbox    | 🟡 MEDIUM | Form input validation                      |
| Form/Radio       | 🟡 MEDIUM | Form input validation                      |
| EmptyState       | 🟢 LOW    | Static display component                   |
| LoadingSpinner   | 🟢 LOW    | Simple visual component                    |
| AILoadingSpinner | 🟢 LOW    | Specialized variant                        |
| AudioWaveform    | 🟢 LOW    | Specialized, less reused                   |
| PlyrVideoPlayer  | 🟢 LOW    | Third-party wrapper                        |
| toast            | 🟢 LOW    | Utility function                           |

---

## Guidelines for Adding Coverage

### When to Add a Story

**Always add stories for:**

- ✅ Reusable UI components with multiple variants
- ✅ Components with visual states (hover, active, disabled)
- ✅ Components with different sizes or colors
- ✅ Complex layouts (cards, modals, tables)
- ✅ Form inputs and controls

**Skip stories for:**

- ❌ One-off page-specific components
- ❌ Pure logic components (no visual output)
- ❌ Utility functions

### When to Add Tests

**Always add tests for:**

- ✅ Interactive components (buttons, inputs, selects)
- ✅ Components with event handlers (onClick, onChange)
- ✅ Components with conditional logic
- ✅ Components with accessibility requirements
- ✅ Components with validation logic
- ✅ Components managing state

**Skip tests for:**

- ❌ Pure presentational components (static display)
- ❌ Simple wrappers with no logic

---

## Testing Best Practices

### Story Best Practices

1. **Show all variants**

   ```tsx
   // ✅ Good - Shows all button variants
   export const Primary: Story = { args: { variant: "primary" } };
   export const Secondary: Story = { args: { variant: "secondary" } };
   export const Danger: Story = { args: { variant: "danger" } };
   ```

2. **Use realistic data**

   ```tsx
   // ✅ Good - Realistic user name
   export const WithUser: Story = {
     args: { user: { name: "John Doe", email: "john@example.com" } },
   };

   // ❌ Bad - Lorem ipsum
   export const WithUser: Story = {
     args: { user: { name: "Lorem ipsum dolor" } },
   };
   ```

3. **Document edge cases**
   ```tsx
   // ✅ Good - Shows what happens with long text
   export const LongText: Story = {
     args: {
       children:
         "This is a very long button text that might overflow the container",
     },
   };
   ```

### Test Best Practices

1. **Test user behavior, not implementation**

   ```tsx
   // ✅ Good - Tests what user experiences
   it("shows error message when input is invalid", () => {
     render(<Input value="" required />);
     fireEvent.blur(screen.getByRole("textbox"));
     expect(screen.getByText("This field is required")).toBeInTheDocument();
   });

   // ❌ Bad - Tests internal state
   it("sets error state to true", () => {
     const wrapper = shallow(<Input />);
     wrapper.setState({ error: true });
     expect(wrapper.state("error")).toBe(true);
   });
   ```

2. **Use accessible queries**

   ```tsx
   // ✅ Good - Uses role/label (how users find elements)
   screen.getByRole("button", { name: "Submit" });
   screen.getByLabelText("Email address");

   // ❌ Bad - Uses test IDs or classes (implementation details)
   screen.getByTestId("submit-btn");
   screen.getByClassName("btn-primary");
   ```

3. **Test accessibility**

   ```tsx
   it("is keyboard accessible", () => {
     render(<Button onClick={onClick}>Click</Button>);
     const button = screen.getByRole("button");

     button.focus();
     expect(button).toHaveFocus();

     fireEvent.keyDown(button, { key: "Enter" });
     expect(onClick).toHaveBeenCalled();
   });
   ```

4. **Test error states**
   ```tsx
   it("handles invalid input gracefully", () => {
     render(<DatePicker value="invalid-date" />);
     expect(screen.getByText("Invalid date format")).toBeInTheDocument();
   });
   ```

---

## Running Tests & Stories

### Storybook

```bash
# Start Storybook dev server
npm run storybook

# Build static Storybook
npm run build-storybook

# View at http://localhost:6006
```

### Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode (development)
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage

# Run specific test file
npm run test src/components/ui/Button.test.tsx
```

---

## Adding a New Component - Checklist

When creating a new UI component, follow this checklist:

- [ ] **1. Create component** (`Button.tsx`)

  - [ ] TypeScript props interface with JSDoc comments
  - [ ] Proper TypeScript types (no `any`)
  - [ ] Dark mode support
  - [ ] Accessibility (ARIA, keyboard nav)

- [ ] **2. Create Storybook story** (`Button.stories.tsx`)

  - [ ] All visual variants
  - [ ] All sizes
  - [ ] Interactive states (hover, active, disabled)
  - [ ] Edge cases (long text, no text, with icons)
  - [ ] Realistic example data

- [ ] **3. Create tests** (`Button.test.tsx`)

  - [ ] Renders correctly
  - [ ] User interactions (click, type, etc.)
  - [ ] Event handlers fire correctly
  - [ ] Conditional rendering (states, props)
  - [ ] Accessibility (keyboard nav, ARIA)
  - [ ] Edge cases and error states
  - [ ] **Target: 80%+ coverage**

- [ ] **4. Update documentation**
  - [ ] Add to component library list
  - [ ] Update CLAUDE.md if it's a standardized component
  - [ ] Add usage examples

---

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Vitest Documentation](https://vitest.dev/guide/)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about#priority)
- [Component Testing Guide](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Next Steps

### Immediate Priorities (High Priority)

1. **Add tests for Button component**

   - Most used component in the app
   - Critical user interaction
   - No tests currently

2. **Add stories for Form components**

   - Input, Select, Textarea
   - Referenced in CLAUDE.md as standardized components
   - Need visual documentation

3. **Add tests for Form components**
   - User input validation critical
   - Accessibility requirements
   - Error handling logic

### Long-term Goals

- 📖 **Story coverage: 90%+** (all reusable components)
- 🧪 **Test coverage: 80%+** (all interactive components)
- 🎯 **CI/CD integration** (automated visual regression testing)
- 📊 **Coverage tracking** (automated reports)

---

**Last Updated:** 2025-12-11
**Maintainer:** Development Team
