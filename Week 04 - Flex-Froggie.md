<h1>Beginning Class Instructor Reminder</h1>

Please remember to start recording the RI session BEFORE the session begins; the check-in question should be present in the recording. Be sure to remind students that they are being recorded.

---

# Week 1 - Flexbox Froggy: Mastering CSS Flexbox

## Table of Contents

- [Background](#background)
- [Learning Objectives](#learning-objectives)
- [Glossary](#glossary)
- [Getting Started](#getting-started)
- [Entry Ticket](#entry-ticket)
- [Project Set-Up](#project-set-up)
- [Materials](#materials)
- [Presentation (15 mins)](#presentation-15-mins)
- [Code Along (35 mins)](#code-along-35-mins)
- [Step One (I DO)](#step-one-i-do)
- [Step Two (WE DO)](#step-two-we-do)
- [Step Three (YOU DO)](#step-three-you-do)
- [Wrap-Up](#wrap-up)
- [Review (10 mins)](#review-10-mins)
- [Exit Ticket (5 mins)](#exit-ticket-5-mins)
- [Homework (5 mins)](#homework-5-mins)

## Background

At this point, learners have just learned the basics of CSS. This lesson plan will introduce them to CSS Flexbox through Flexbox Froggy, an interactive game.

## Learning Objectives

- Understand the fundamentals of CSS Flexbox.
- Use Flexbox properties to align and distribute space among items in a container.
- Apply Flexbox skills to solve layout challenges.

## Glossary

<details>
<summary><span style="color: purple;">Flex Container</span> - The element that defines a flex context for its children.</summary>
Flex containers become flexible by setting the display property to flex or inline-flex.
<br><br>

```bash

```

</details>
<details>
<summary><span style="color: purple;">Flex Item</span> - Direct children of flex containers.</summary>
Items within a flex container can be laid out in any direction and have flexible dimensions to adapt to the display space.
<br><br>

```bash

```

</details>

---

## Getting Started

### Entry Ticket

- Review basic CSS properties and concepts.

### Project Set-Up

- No specific setup required. Ensure you have a web browser ready for Flexbox Froggy.

### Materials

- Slide Decks: [Shared folder in the RI Drive](https://drive.google.com/drive/u/0/folders/1HjPpvqZZB9AuAcNEbCIOYaoC8TJSm5Tx)
- Flexbox Froggy: [Start the game](http://flexboxfroggy.com/)

---

## Presentation (15 mins)

- Introduce CSS Flexbox as a powerful layout tool.
- Discuss Flexbox properties like `justify-content`, `align-items`, and `flex-direction`.

---

## Code Along (35 mins)

### Step One (I DO)

Demonstrate the first few levels of Flexbox Froggy, explaining the CSS properties used.

In this step, I'll demonstrate how to solve the first few levels of Flexbox Froggy. I will start by introducing the basic concepts of Flexbox, such as display: flex;, justify-content:, and align-items:.

- Level 1: Here, I will use `justify-content` which aligns items horizontally and demonstrate solving the level by positioning the frog on the right side of the pond.

  ```bash
  # Command to solve Level 1
  justify-content: flex-end;
  ```

Explain that justify-content: flex-end; moves the items to the end of the container.

- Level 2: Introduce align-items to align items vertically within the container.

  ```bash
  # Command to solve Level 2
  align-items: flex-end;
  ```

Discuss how align-items: flex-end; aligns the frogs to the bottom of the pond.

- Level 3: Combine both justify-content and align-items to move the frog to the bottom right corner of the pond.

  ```bash
  # Command to solve Level 3
  justify-content: flex-end;
  align-items: flex-end;
  ```

### Step Two (WE DO)

Collaboratively work through mid-level stages of Flexbox Froggy, encouraging students to suggest solutions.

Now, engage the students with mid-level stages, encouraging them to suggest the solutions. This collaborative approach reinforces their understanding and allows them to apply what they've learned.

- Level 6: Focus on using justify-content with values like space-between, space-around, and space-evenly.

Ask students for suggestions on how to evenly space the frogs across the pond.
Demonstrate the solution based on their inputs.

```bash
# Example command for Level 6
justify-content: space-between;
```

- Level 8: Introduce flex-direction to change the direction of items in the container.

Encourage students to predict the effect of changing the flex direction to row-reverse or column.

Solve the level together using their suggestions.

```bash
# Example command for Level 8
flex-direction: row-reverse;
```

- Level 10: Discuss align-self, which allows individual items to override the default alignment.

Have students attempt to align one frog independently from the others.
Facilitate the process and guide them to the solution.

```bash
# Example command for Level 10
align-self: flex-end;
```

### Step Three (YOU DO)

Students independently tackle the final levels of Flexbox Froggy, with instructor available for questions.

In this final step, students will work independently on the last levels of Flexbox Froggy, applying the advanced concepts of Flexbox they've learned. Be available to answer questions and provide hints if needed.

- Level 20: Challenge students with a complex layout that requires using multiple Flexbox properties together.

  - Encourage them to apply different combinations of justify-content, align-items, flex-direction, and order.

  - Provide guidance and support as needed without giving away the solution immediately.

<details>
<summary>Level 20: This level challenges the students to apply a combination of Flexbox properties to achieve a specific layout. The goal might involve aligning frogs or creating space between them in a more complex arrangement than earlier levels.<br><br>

  Objective: Use flex-wrap, flex-direction, and justify-content to wrap frogs onto multiple lines as needed.</summary>
<span style="color: goldenrod;">SOLUTION:</span>

```bash
flex-wrap: wrap;
flex-direction: column-reverse;
justify-content: center;
```

</details>

- Level 24: The final level involves a comprehensive understanding and application of all the Flexbox properties encountered in the game.

  - Motivate students to experiment with solutions and learn from trial and error.

  - Offer hints and encourage peer discussion for collaborative problem-solving.

<details>
<summary>Level 24: The final level is the culmination of all the Flexbox concepts learned through the game. It may require students to use nearly all the properties discussed in previous levels to position the frogs exactly as needed.<br><br>

  Objective: Apply a comprehensive understanding of Flexbox to solve the most challenging layout.</summary>

<span style="color: goldenrod;">SOLUTION:</span>

```bash
justify-content: space-around;
align-items: flex-end;
flex-direction: row-reverse;
```

</details>

---

## Wrap-Up

### Review (10 mins)

- Recap key Flexbox concepts and properties discussed during the game.

### Exit Ticket (5 mins)

- Access code: 1234

    <details>
    <summary>Question: Which property aligns items horizontally in a flex container?</summary>
    <span style="color: goldenrod;">Answer:</span> justify-content
    </details><br>

    <details>
    <summary>Question: Which property aligns items horizontally in a flex container?</summary>
    <br>
    <span style="color: goldenrod;">Answer:</span> justify-content
    </details><br>

    <details>
    <summary>Question: What property is used to change the main axis of a flex container?</summary>
    <br>
    <span style="color: goldenrod;">Answer:</span> flex-direction
    </details><br>

    <details>
    <summary>Question: How can you make flex items wrap onto multiple lines if there is not enough room in the flex container?</summary>
    <br>
    <span style="color: goldenrod;">Answer:</span> flex-wrap: wrap;
    </details><br>

    <details>
    <summary>Question: Which property aligns a flex item on the cross axis, overriding the align-items value of the flex container?</summary>
    <br>
    <span style="color: goldenrod;">Answer:</span> align-self
    </details><br>

This solution demonstrates the combined use of justify-content to distribute space around items, align-items to align items vertically at the end of the container, and flex-direction to reverse the row direction. It showcases the power of Flexbox in creating complex layouts with simple CSS properties.

---

### Additional Notes for Instructors

- Encourage Exploration: Even with the solutions provided, encourage students to experiment with different properties to see how they affect the layout. This exploration strengthens their understanding of Flexbox.

- Debugging Tips: Share common pitfalls and debugging tips for Flexbox, such as the importance of understanding the main axis vs. cross axis, or the effect of flex-wrap when dealing with multiple items.

- Real-world Application: Discuss how these Flexbox properties can be applied to real-world web development projects, enhancing layout responsiveness and design flexibility.

### Homework (5 mins)

- Practice using Flexbox in a personal project or revisit earlier levels of Flexbox Froggy to reinforce learning.

---

## End Class Instructor Reminder

- Please complete the data tracker if you are the sole instructor for the class.
- Remember to upload today's teaching materials.
