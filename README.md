README WIP, see [tests](packages/cantos/tests) for working examples
---

# Cantos: Write Better Tests

Cantos is a simple, lightweight, framework-agnostic typescript design library to help you write better design documents
with easy, and support test-driven and/or behavior-driven development.

## Quick Start

```ts


```

## What Cantos does

### Cantos provides a way to think through your software

The main purpose of Cantos is to help you write the feature part of your `design document`, e.g. __what__ your software
__should__ do.

It's an easy and great way to let you reason about your software with natural language before you write the code.

Cantos prioritizes `user stories` over `technical spec` as the way to write the stories from the user's
perspective.

Writing `user stories` often gives you a more purposeful and stable design that is less likely to change compared to
implementation details.

It means you get to think through the __purposes and features__ of your software ___in detail___ without getting bogged
down ___by the details___ of __implementation__ too early.

It's about thinking in terms of

- the ___what___,
- the ___interfaces___,
- the ___scenarios___, and
- the ___things to test___,

before thinking about

- the _how_,
- the _implementations_,
- the _technical workflows_, and
- the _actual tests_ to write.

Usually, design document and development management is done using either regular text documents or on platforms such as
Jira, Confluence, etc.

Cantos offers an option to similar things in your Typescript program and gives you better developing and testing
experience with easy integration with your existing test frameworks.

### Cantos is a tool to help you write better tests in general

#### Usual way of writing tests

Too often we write tests for features in adhoc fashions, if at all:

1. We first come up with an idea for a feature,
2. we write the code,
3. and then we write some tests (or just "click around") to verify the code,
4. and, to these tests, we give labels such as "this should work", "that should render", or "those should load"--whatever makes sense at the moment.
5. we add more features, and repeat the steps above.

Even with TDD workflow, we often just reverse the order of the steps above by doing 3 (writing test)  and 4 (designing
test) before 2 (coding).

##### Problems with the usual way of writing tests

Often, these work OK until our program becomes more complex when we find that, to name a possible few:

- Initial design of the feature is not well thought through, and as a result both the code and tests need to be re-written.
- Tests are tightly coupled with the implementation details. It means __too many__ tests fails with a slight change of our code, which is the design flaw of our initially test because they were specifically written for the initial codes.
- Test labels need to be kept in sync, e.g. what used to be "this should work" is now "this should work with this and that".
- The tests are not well organized and becomes long suites difficult to navigate.
- The tests descriptions are too technical and hard to understand sometimes without looking at the actual tests.
- It is hard to figure out what a test is _really_ testing and what larger purpose some tests is serving together (for example, to make sure a connection error dialog is shown when the user lost internet connection).

#### Cantos way of writing tests

Cantos lets you use your prepared user stories as __the single source of truth for the feature design of your software__
to be directly used in your tests (unit, integration, e2e, ...) descriptions and other places.

It effectively turns your tests into

- clear and readable stories.
- a mirror of the organization of your features designs (rather than implementations).

You no longer needs to manually keep your tests descriptions and organizations and design documents in sync. No more tedious writing and re-writing of test labels such as "this should work", "that should render", or "those should load." Instead, simply refer to your stories (with IDE autocomplete) to explain what your tests are about.

##### Improve your testing workflow

Cantos helps you mitigate the above hypothetical issues by letting you do things differently:

1. Write story first

- You first write our your stories (features, scenarios, behaviors, etc.), which allows you to think through the features as a whole.

```ts

```

2. Write tests based on the stories

- You then write your tests based on the stories, using the stories as labels for your tests, which explains their larger purpose and relations to features.
    - Most often, you only write the __larger tests__ units, such as "user should get warning when the connection is lost".
    - Remember, you don't need to write these labels, but directly use the stories as labels which will be automatically synced.
    - Under the larger test units, you write __smaller tests__ for the implementation details, such as "Warning dialogue should be disposed of when the user click outside the dialogue".

3. Develop and refactor with ease

- You then write your code to make the tests pass.
- When you need to refactor, you
    - You update the stories, e.g. change it to say you want your app to be more explicit about available user interactions.
    - You update the tests, which has become much easier:
        - Navigate to the __larger tests units__ linked to your story which are already updated and remain __unchanged__
        - Then, you drop __the smaller tests__ that are no longer relevant, such as the clicking-outside-warning-dialog test, and
        - write new ones, such as a test with the "User should be presented with a button to close the dialog" under the larger test units.

### Incremental adoption, framework-agnostic, lightweight, and composable

Cantos is designed to be easily adoptable for your existing JS testing frameworks and runners such as
Jest/Vitest/Playwright/...

You can simply add it like this to your existing test files:

```ts
import {C} from 'cantos'

```

- Zero overhead and easy incremental adoption to use with your existing test frameworks and runners such as
  Jest/Vitest/Playwright/...
- Lightweight: ~3kb gzipped.

> BDD is a special flavor of TDD
>
>
>

## Ideas behind Cantos

Cantos simply rehashes some of the old ideas of BDD and software engineering principles in general, for example,

### 1. What before How

Did you ever feel that you only started to know what your software __reall__ is, after you have written the code?

Sometimes, this is inevitable as part of the process of development, but sometimes

```ts
```

### 2. Specification before Implementation

### 3. User before Developer

- A User story

| Is                                    | Is Not                                      |
|---------------------------------------|---------------------------------------------|
| From a user's perspective             | From a developer's perspective              |
| Tells a narrative, i.e. a story       | Tells about implementation detail           |
| __Concrete__ like stories in contexts | __Concrete__ as a detailed technical issues |
|

### 4. Scenario before Testing1

## Use Test Acts with TDD/BDD workflows

## Perspective of the users

### Helpers

```ts
```

- :heavy_check_mark: **Plan** your tests in a tree structure.

## Examples

### Use satisfies to get intellisense for UserAct

```ts


```

- It works great with CoPilot because it has a clear structure to infer from.

## Glossary

GWT
: `Given`-`When`-`Then`

Step
: A reusable component of in a user `story` consists of `GWT`, usually under a `feature`. The same meaning as `act` but
used in the context of BDD user stories.
