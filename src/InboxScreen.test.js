import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  waitFor,
  cleanup,
  within,
  fireEvent,
} from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import { getWorker } from "msw-storybook-addon";
import * as stories from "./InboxScreen.stories";

describe("InboxScreen", () => {
  afterEach(() => {
    cleanup();
  });

  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests
  afterAll(() => getWorker().close());

  const { Default } = composeStories(stories);

  it("should pin a task", async () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const screen = render(<Default />);

    await waitFor(() => {
      expect(screen.queryByText("You have no tasks")).not.toBeInTheDocument();
    });

    const getTask = () => screen.getByRole("listitem", { name: "Export logo" });

    const pinButton = within(getTask()).getByRole("button", { name: "pin" });

    fireEvent.click(pinButton);

    const unpinButton = within(getTask()).getByRole("button", {
      name: "unpin",
    });

    expect(unpinButton).toBeInTheDocument();
  });

  it("should archive a task", async () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const screen = render(<Default />);

    await waitFor(() => {
      expect(screen.queryByText("You have no tasks")).not.toBeInTheDocument();
    });

    const task = screen.getByRole("listitem", { name: "QA dropdown" });
    const archiveCheckbox = within(task).getByRole("checkbox");
    expect(archiveCheckbox.checked).toBe(false);

    fireEvent.click(archiveCheckbox);
    expect(archiveCheckbox.checked).toBe(true);
  });

  it("should edit a task", async () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const screen = render(<Default />);

    await waitFor(() => {
      expect(screen.queryByText("You have no tasks")).not.toBeInTheDocument();
    });

    const task = screen.getByRole("listitem", {
      name: "Fix bug in input error state",
    });
    const taskInput = within(task).getByRole("textbox");

    const updatedTaskName = "Fix bug in the textarea error state";

    fireEvent.change(taskInput, {
      target: { value: "Fix bug in the textarea error state" },
    });
    expect(taskInput.value).toBe(updatedTaskName);
  });
});
