---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
---

# UX Design Specification simple-todo-bmad

**Author:** Virender
**Date:** 2026-03-10

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

A focused, personal todo app built on one non-negotiable product contract: capture a task in under five seconds, trust it will be there tomorrow, enrich it later if needed. Every UX decision flows from this contract — the "It Just Works" principle. Creation is a single text input with zero friction; enrichment is opt-in at edit time. The app is both a daily-use personal productivity tool and a portfolio-quality demonstration of full-stack JavaScript architecture.

### Target Users

**Alex — The Capture Reflex:** On-the-go, cross-device user who captures tasks mid-meeting or mid-thought. Needs instant input with no decisions required. Auto-focus on desktop, large tap targets on mobile, Enter/Submit to create, optimistic UI. Time is the primary constraint.

**Jordan — The Organizer:** Returns to their todo list to process and enrich it. Opens the edit drawer to add categories, due dates, importance flags, and descriptions. Relies on the filtered views (Expiring, Important) to surface what matters without manual sorting.

**Sam — The Frustrated User:** Uses the app on spotty connections. Needs transparent failure states — no silent errors, no lost input, clear retry affordance. Inline field validation on the edit drawer matters here. Sam's experience is a first-class design concern, not an edge case.

### Key Design Challenges

1. **Speed vs. Depth tension:** The create interaction must feel as fast as a sticky note (one field, Enter, done). The edit/enrichment interaction needs the depth of a form tool. Both live in the same product — the design must ensure the create path is never polluted by the edit path's complexity.

2. **Mobile-desktop parity with divergent interaction models:** Auto-focus on desktop only (mobile keyboard jank avoidance), edit drawer as bottom sheet on mobile vs. panel on desktop, native date picker on mobile — the design intent is identical but the implementation patterns diverge. The UX spec must call out these divergences explicitly.

3. **Failure states as first-class UX:** Error messages, input preservation on failure, retry affordance, and inline validation must feel intentionally designed. Sam's error-recovery journey is as important as Alex's happy path.

### Design Opportunities

1. **The Edit Drawer as the signature interaction:** Bottom sheet on mobile / panel on desktop — this is where progressive disclosure happens. Getting the open/close animation, field layout, save feedback, and error handling right makes or breaks Jordan's daily experience.

2. **Smart filtered views as the differentiating UX:** All, Important, Expiring, and Completed surface the right todos automatically — users never manually sort or bucket. The visual design of these views and their tab/navigation treatment should reinforce this "automatic intelligence" feel.

3. **The completion micro-interaction:** Single-tap complete with strikethrough animation is a high-frequency daily interaction. A satisfying, instant response here is the moment that makes the app worth returning to every day.

## Core User Experience

### Defining Experience

The core user action is **todo creation** — one text field, Enter or Submit, done. This is not just the most frequent interaction; it is the entire product value proposition. A user who cannot capture fast will not return. Every other capability (enrichment, filtering, views) exists to make captured todos more useful — but never at the cost of capture speed.

The product operates on a two-stage interaction model: **Stage 1 — Capture** is frictionless and always available. **Stage 2 — Enrichment** is opt-in, accessed through the edit drawer, never required during creation.

### Platform Strategy

**Platform:** Responsive web application — Chrome, Firefox, Safari on desktop and mobile (latest two versions each). No native app, no installation, no account required in v1.

**Desktop (mouse + keyboard):** Input auto-focused on load. Enter key submits. Tab navigation throughout. Keyboard accessibility across all interactive elements.

**Mobile (touch):** No input auto-focus on load (prevents keyboard jank). Large tap targets (minimum 44×44px) throughout. Edit drawer renders as a bottom sheet. Native date input for due date picker. All actions reachable with one thumb.

**Offline:** Not supported. No service workers, no local cache. Failures surface explicitly to the user with clear retry affordance.

### Effortless Interactions

The following interactions must feel completely natural — zero friction, zero thought required:

- **Create:** One text field visible on load. Type → Enter/Submit. Todo appears instantly (optimistic). No other fields, no decisions.
- **Complete:** Single tap or click on a todo item. Instant strikethrough animation. Item moves to Completed view automatically.
- **View switching:** Tab navigation between All / Important / Expiring / Completed. Instant — no page load, no navigation.
- **Smart view population:** Todos appear in Expiring and Important automatically as users add enrichment data — views feel alive without any manual sorting or bucketing.

### Critical Success Moments

- **The 10-second first todo:** A brand-new user types and hits Enter before they've had time to second-guess the app. No instructions, no onboarding, no friction. This is the make-or-break first impression.
- **The return visit:** User opens the app the next day and every todo is exactly where they left it. This moment establishes trust and defines the product as reliable.
- **The completion tap:** The strikethrough fires instantly, the item cleanly leaves the active list. The micro-interaction is satisfying. This high-frequency daily moment is what creates habit.
- **The failed create (Sam's moment):** Network error on submit. Feedback is immediate and specific. Input is fully preserved. Retry is one click. If this fails silently or loses input, trust is permanently broken.

### Experience Principles

1. **Capture first, organize later.** Creation is never gated by categorization, due dates, or any other field. Enrichment always happens after capture, in a separate interaction, and is always optional.

2. **Zero surprise.** Successful operations feel instant via optimistic UI. Failures are visible, specific, and recoverable — never silent, never vague, never data-destroying. The app behaves exactly as the user expects, every time.

3. **Mobile is not second-class.** Every interaction on mobile gets the same design attention as desktop. Different patterns (bottom sheet vs. panel, native date pickers, no auto-focus) are intentional design choices, not compromises or afterthoughts.

4. **Smart surfaces, zero maintenance.** Users never sort, drag, or manually bucket todos. The four filtered views surface the right todos automatically. The UX goal: the app feels like it knows what you need before you ask.

## Desired Emotional Response

### Primary Emotional Goals

**Primary: Trust.** The app's core emotional contract is reliability — "give it to me, I'll hold it." Users open this app because they need to believe something won't be forgotten. Every design decision must reinforce this promise. Trust is not established once; it is confirmed on every return visit when todos are exactly where the user left them.

**Secondary: Effortlessness.** The app should feel like it disappears — users feel the thought captured, not the tool used. Like a good pen. The absence of friction is itself the emotional experience during creation.

**Supporting: Accomplishment.** The completion interaction is a moment, not just a state change. Users should feel a small but real "got it done" satisfaction when they mark a todo complete.

**Defining Character: Low-Stakes Sanctuary.** The app is calm, non-demanding, and always waiting. No notifications, no streaks, no guilt. It holds things without judgment and respects user attention. It waits — it does not chase.

### Emotional Journey Mapping

| Stage | Desired Emotion | Design Driver |
|---|---|---|
| First encounter | Confidence | Obvious UI, cursor in right place, no instructions needed |
| During creation | Effortlessness | Single field, Enter to submit, optimistic instant response |
| After task completion | Accomplishment + Relief | Strikethrough animation, clean exit from active list |
| Returning next session | Trust + Relief | Todos exactly where they were — "it remembered." Nothing lost, nothing changed |
| When something goes wrong | Reassured, not panicked | Input preserved, specific error, retry one click away |

### Micro-Emotions

- **Confidence over confusion** — the UI always communicates what to do next; no dead ends, no ambiguous states
- **Trust over skepticism** — every write failure is surfaced; silence is the primary enemy of trust
- **Accomplishment over frustration** — completion is a designed moment, not just a boolean state change
- **Calm over anxiety** — the app never feels fragile or demanding; it feels like a stable, silent partner
- **Ownership** — this is *my* private list; not shared, not social, not judged. The UX should feel like a private notebook, not a collaborative board

### Emotions to Avoid

- **Anxiety about data loss** — caused by silent failures, vague error messages, or missing rollback
- **Confusion about item state** — caused by completed todos disappearing without clear visual transition
- **Friction-frustration during capture** — any extra step or field during creation is an emotional failure
- **Helplessness on error** — caused by errors without retry paths or lost input
- **Overwhelm** — even with a long todo list, the UI must feel manageable, not mounting; the filtered views help architecturally but visual design must reinforce it

### Design Implications

| Emotional Goal | UX Design Approach |
|---|---|
| Trust | Clean minimal UI; explicit specific error messages; visible rollback on failure; no silent state changes |
| Effortlessness | Auto-focus on desktop; instant optimistic updates; no confirmation dialogs on common actions |
| Accomplishment | Satisfying strikethrough animation; completed items exit the active list cleanly and visually |
| Reassurance on failure | Specific error copy ("Couldn't save. Check your connection."); preserved input; one-click retry always visible |
| Low-stakes sanctuary | No notifications, streaks, badges, or engagement mechanics; generous whitespace; calm visual palette; app waits, never demands |
| Ownership | No social UI patterns; no avatars or sharing affordances; private-feeling visual language |

### Emotional Design Principles

1. **Silence is the enemy of trust.** Every async operation must have a visible outcome — success (optimistic instant), failure (specific message + retry), or loading (indicator). No silent states.

2. **The tool should disappear.** The best interaction is one the user doesn't notice because it worked exactly as expected. Effortlessness is not about animation — it's about zero decisions required on the happy path.

3. **Completion is a moment worth marking.** The strikethrough + list exit animation should feel clean and satisfying — the quiet relief of a closed loop, not a celebration. This high-frequency interaction is the daily emotional payoff.

4. **Failure is not the end — recovery is.** When things go wrong, the emotional goal is "I know what happened, and I can fix it" — never "I don't know what happened" or "I lost my work."

5. **Respect attention. Don't demand it.** The app is a low-stakes sanctuary — calm, non-demanding, always available. It holds things without judgment. Design for the user who comes back because they want to, not because they were nudged.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

#### Microsoft To Do

**What it does brilliantly:**
- **Completion animation** — the checkbox bounce/fill is one of the most satisfying micro-interactions in the category. Completing a task feels earned, not clinical.
- **Progressive disclosure via side panel** — tapping a task opens a detail panel without navigating away from the list. The list context is always preserved. This is the template for our edit drawer pattern.
- **Always-visible add input** — the "Add a task" field is permanently present at the top/bottom of every list. Zero navigational cost to capture — no button to find, no screen to navigate to.
- **Hover-reveal action buttons** — on desktop, complete/delete actions appear only on hover, keeping the resting list state clean and scannable.

**What to avoid:**
- My Day suggestions, shared lists, integrations, and assistant features — feature accumulation that erodes the sanctuary feeling and turns a capture tool into a productivity system.
- List-of-lists organizational model — introduces organization anxiety. Our filtered views replace this with automatic surfacing, no user-managed buckets.

#### Google Tasks

**What it does brilliantly:**
- **Radical simplicity of the add input** — a bare text field, nothing else. The fastest task entry in the category. Directness is the design.
- **No-chrome list view** — the list fills the entire canvas with no sidebar nav or header clutter. Creates the quiet, focused feeling that aligns with "low-stakes sanctuary."
- **Lightweight view switching** — moving between task lists is instant and low-ceremony. Maps directly to our filtered view tab pattern.

**What to avoid:**
- **No visual hierarchy on long lists** — when a list grows, identical-weight text becomes a wall. Our importance flag and category tags must provide the visual hierarchy Google Tasks lacks.
- **Losing list context on edit** — editing a task on mobile takes you away from the list entirely. The opposite of the progressive disclosure lesson from Microsoft To Do.
- **Auxiliary/embedded positioning** — living inside Gmail makes Tasks feel secondary. Our app is a dedicated, always-pinned tab — that standalone presence is part of the sanctuary positioning.

### Transferable UX Patterns

**Interaction Patterns:**
- **Completion animation** (from Microsoft To Do) — adopt directly; the checkbox fill/bounce micro-interaction makes completion feel earned
- **Side panel / progressive disclosure for editing** (from Microsoft To Do) — adopt as the edit drawer; list context is always preserved when enriching a todo
- **Always-visible add input** (both) — adopt; the capture field is permanently present, never behind a button or navigation step
- **Hover-reveal secondary actions** (from Microsoft To Do) — adopt for desktop; complete/delete appear on hover only, keeping the resting list clean

**Visual Patterns:**
- **No-chrome list canvas** (from Google Tasks) — adopt; the list is the entire experience, no surrounding UI competes for attention
- **Lightweight tab switching** (from Google Tasks) — adopt for filtered view navigation; instant, low-ceremony, no page load

### Anti-Patterns to Avoid

- **Feature accumulation beyond the core** — each addition to Microsoft To Do beyond basic tasks erodes its sanctuary quality; every scope addition to simple-todo-bmad must pass the "It Just Works" test
- **Visual uniformity on long lists** — Google Tasks becomes a wall of identical text at scale; importance flags, category labels, and due date indicators must provide scannable hierarchy
- **Losing list context on edit** — Google Tasks mobile forces a context switch to edit; our edit drawer (bottom sheet on mobile, panel on desktop) prevents this entirely
- **Attention-demanding features** — reminders, suggestions, streaks, and notification badges from both apps; these conflict directly with the low-stakes sanctuary emotional goal

### Design Inspiration Strategy

**Adopt directly:**
- Completion micro-animation — checkbox fill with satisfying feedback
- Progressive disclosure edit panel — task detail opens alongside the list, never replacing it
- Always-present capture input — permanently visible, zero navigational cost
- Hover-reveal action buttons on desktop — clean resting state, actions appear when needed

**Adapt for our context:**
- Microsoft To Do's side panel → our edit drawer (bottom sheet on mobile, panel on desktop) — same progressive disclosure principle, adapted for mobile-equal layout
- Google Tasks' no-chrome list → our list canvas with added visual hierarchy — same quiet simplicity, but with importance flags and category tags providing scannable structure

**Avoid entirely:**
- List-of-lists organizational model — replaced by automatic filtered views
- Feature layers beyond CRUD + enrichment — every addition must pass the "It Just Works" filter
- Any UI pattern that demands attention, tracks engagement, or judges the user

## Design System Foundation

### Design System Choice

**Selected Approach:** Tailwind CSS + shadcn/ui (Radix UI primitives)

A headless component + utility-class approach. Radix UI provides accessible, unstyled interactive primitives (dialogs, popovers, focus management). shadcn/ui provides opinionated-but-neutral component recipes built on Radix. Tailwind CSS provides the constraint-based design token system for spacing, color, and typography. Components are copied into the codebase — no upstream library lock-in.

### Rationale for Selection

- **No visual baggage** — unlike Material UI or Ant Design, this approach carries no inherited visual identity; the result looks custom-built, appropriate for both daily personal use and portfolio presentation
- **Calm, minimal by default** — Tailwind's constraint system enforces the spacing, color, and typographic restraint that the "low-stakes sanctuary" emotional goal requires
- **Accessibility included** — Radix UI primitives handle focus management, keyboard navigation, ARIA roles, and screen reader support out of the box; satisfies all NFR accessibility requirements without custom implementation
- **Solo developer speed** — shadcn/ui components are production-ready starting points; the edit drawer, tabs, and dialog patterns are available immediately and fully customizable
- **Mobile-equal ready** — Tailwind's responsive prefix system (`sm:`, `md:`, `lg:`) and the bottom-sheet/panel pattern are natural fits for the mobile-desktop parity requirement
- **Portfolio quality** — the output looks intentionally designed, not templated; the codebase demonstrates modern React component patterns

### Implementation Approach

The app requires a small, focused component set — not a full design system:

| Component | Source | Notes |
|---|---|---|
| Text input (create todo) | Custom + Tailwind | Always-visible, auto-focus on desktop |
| Todo list item | Custom + Tailwind | Hover-reveal actions, completion animation |
| Edit drawer | Radix Dialog/Sheet + Tailwind | Bottom sheet on mobile, panel on desktop |
| Tab navigation (filtered views) | Radix Tabs + Tailwind | All / Important / Expiring / Completed |
| Category picker | Radix Select + Tailwind | Predefined options, clearable |
| Date input | Native `<input type="date">` | Mobile-native picker, no custom widget |
| Importance toggle | Custom button + Tailwind | Flag/unflag with visual state |
| Loading / error states | Custom + Tailwind | Inline, contextual to each operation |

### Customization Strategy

**Design tokens to define (Tailwind config):**
- Color palette: neutral base (slate/zinc) with a single accent color for importance/active states
- Typography: system font stack for performance and native feel; clear size scale (base, sm, xs)
- Spacing: consistent 4px base unit throughout
- Border radius: subtle rounding — not sharp, not pill-shaped; approachable but not playful
- Shadows: minimal; used only for the edit drawer overlay, not decoratively

**Visual direction:** Clean white/light background, high-contrast text, muted secondary text for metadata (dates, categories). Importance flag uses a distinct accent color. Completion state uses strikethrough + muted color. The palette should feel like a quality notebook, not a productivity dashboard.

## Core Interaction Design

### 2.1 Defining Experience

**"Type a thought, hit Enter — it's gone from your head and into the list."**

The defining interaction is todo creation. Not task management, not productivity organization — the act of offloading a thought before it disappears. Every other capability in the product exists to make that captured thought more useful later. Nothing competes with or complicates the capture moment.

### 2.2 User Mental Model

Users approach this app with the mental model of a sticky note or physical notebook — not a task manager. The expectation is: open → see input → type → done. Zero decisions between thought and capture.

**What they love about simple solutions:** Speed, no judgment, always available, no categorization required upfront.

**What frustrates them about complex tools:** Being asked "which project? which priority? which team member?" before they can save a thought. The capture reflex dies in that gap. Simple-todo-bmad's UX contract is to close that gap to near zero.

**The mental model to reinforce:** A private notebook that remembers everything exactly as written, available instantly, never loses a page.

**The trust moment:** Trust is not established on first capture — it is established on the *return visit*, when the user opens the app and their todos are exactly where they left them. "It remembered." The capture mechanic sets the expectation; the return visit delivers the proof.

### 2.3 Success Criteria

- Input field is the most visually prominent element on the page — no scanning required to find it
- Desktop: cursor is in the input on load, no click needed before typing
- Mobile: input is large and tappable; keyboard appears on tap, not on load
- Todo appears in the list *right below the input* before server responds — perceived latency is zero (optimistic UI)
- New todos prepend to the top of the list; the visual confirmation is immediate and in-view
- Input clears and refocuses after submission — ready for next capture with no user action
- On failure: input text fully restored, specific inline error, retry is one action away
- App load resolves the todo list fast enough that it feels "already there" — not "loading in"
- First-time user adds their first todo within 10 seconds of opening the app

### 2.4 Pattern Strategy: Established with Progressive Disclosure Innovation

The capture interaction uses a fully **established pattern** — a web form text input with submit button. The innovation is entirely in what's *absent*: no required fields beyond text, no project selection, no priority gate, no category picker during creation. Users already know how to type and hit Enter.

The genuine design innovation is the **hard two-stage model**: creation and enrichment are architecturally separated. The list item *grows* via the edit drawer after capture — enrichment never happens during capture. This separation is enforced at the UX level, not just technical. Most todo apps blur this line; we do not.

**Familiar metaphors used:** Text input + Enter (universal), sticky note (mental model), notebook page (visual feel).

### 2.5 Experience Mechanics

**Core flow: "Capture a Todo"**

| Stage | Behavior |
|---|---|
| **Initiation** | App loads. Todo list resolves immediately — feels "already there," not loading in. Input field is the dominant element. Desktop: auto-focused. Mobile: prominent large tap target, no auto-focus. |
| **Interaction** | User types text. Single-line input. Enter key (desktop) or Submit button (mobile) triggers creation. No other fields shown or required. |
| **Feedback** | Todo prepends to top of list instantly (optimistic UI) in a subtle pending state (slightly muted) for the brief in-flight period. Snaps to full opacity on server confirmation. Input clears and refocuses. No spinner on the happy path. |
| **Completion** | New todo is visible at top of list, right below the input. Input ready for next capture. Implicit promise made: "it'll be here when you come back." Trust confirmed on the next return visit. |
| **Failure path** | Brief loading indicator. Inline error below input: "Couldn't save. Check your connection." Input text fully restored. Retry button visible. No data lost. |
| **Empty input** | Silent no-op. No error message, no shake animation, no scolding. Input stays focused. The app does not judge. |
