import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./Command";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof Command> = {
  component: Command,
  subcomponents: {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "md", "lg"],
      description: "Size of the command palette",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Icon name="calendar" className="mr-2" size={16} />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Icon name="smile" className="mr-2" size={16} />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Icon name="rocket" className="mr-2" size={16} />
            <span>Launch</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Icon name="user" className="mr-2" size={16} />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="mail" className="mr-2" size={16} />
            <span>Mail</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Icon name="settings" className="mr-2" size={16} />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check if command palette is visible
    const commandElement = canvas.getByRole("search");
    expect(commandElement).toBeInTheDocument();

    // Type in search
    const input = canvas.getByPlaceholderText("Type a command or search...");
    await userEvent.type(input, "pro");

    // Check that we can see filtered results
    await expect(canvas.getByText("Profile")).toBeVisible();
  },
};

export const WithSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-medium mb-2">Small</h3>
        <Command size="sm">
          <CommandInput inputSize="sm" placeholder="Small command palette..." />
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem>
                <Icon name="plus" className="mr-2" size={16} />
                <span>Create new</span>
              </CommandItem>
              <CommandItem>
                <Icon name="edit" className="mr-2" size={16} />
                <span>Edit</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div>
        <h3 className="font-medium mb-2">Medium (Default)</h3>
        <Command>
          <CommandInput placeholder="Default command palette..." />
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem>
                <Icon name="plus" className="mr-2" size={16} />
                <span>Create new</span>
              </CommandItem>
              <CommandItem>
                <Icon name="edit" className="mr-2" size={16} />
                <span>Edit</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>

      <div>
        <h3 className="font-medium mb-2">Large</h3>
        <Command size="lg">
          <CommandInput inputSize="lg" placeholder="Large command palette..." />
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem>
                <Icon name="plus" className="mr-2" size={16} />
                <span>Create new</span>
              </CommandItem>
              <CommandItem>
                <Icon name="edit" className="mr-2" size={16} />
                <span>Edit</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  ),
};

export const WithEmptyState: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center justify-center py-6">
            <Icon
              name="rocket"
              className="text-muted-foreground mb-2"
              size={32}
            />
            <p className="text-sm text-muted-foreground">No results found.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try searching for something else.
            </p>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Icon name="calendar" className="mr-2" size={16} />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Icon name="smile" className="mr-2" size={16} />
            <span>Search Emoji</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithDestructiveItems: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Actions">
          <CommandItem>
            <Icon name="save" className="mr-2" size={16} />
            <span>Save</span>
          </CommandItem>
          <CommandItem>
            <Icon name="copy" className="mr-2" size={16} />
            <span>Duplicate</span>
          </CommandItem>
          <CommandItem variant="destructive">
            <Icon name="trash" className="mr-2" size={16} />
            <span>Delete</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandGroup heading="Items">
          <CommandItem>
            <span>Available Item</span>
          </CommandItem>
          <CommandItem disabled>
            <span>Disabled Item</span>
          </CommandItem>
          <CommandItem>
            <span>Another Available Item</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithSelection: Story = {
  render: () => {
    function SelectionDemo() {
      const [selectedItem, setSelectedItem] = useState("");

      return (
        <div className="space-y-4">
          <Command>
            <CommandInput placeholder="Select an item..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Items">
                <CommandItem onSelect={() => setSelectedItem("Item 1")}>
                  <span>Item 1</span>
                </CommandItem>
                <CommandItem onSelect={() => setSelectedItem("Item 2")}>
                  <span>Item 2</span>
                </CommandItem>
                <CommandItem onSelect={() => setSelectedItem("Item 3")}>
                  <span>Item 3</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>

          {selectedItem && (
            <div className="p-2 border rounded text-sm">
              Selected: <strong>{selectedItem}</strong>
            </div>
          )}
        </div>
      );
    }

    return <SelectionDemo />;
  },
};

export const WithDialog: Story = {
  render: () => {
    function DialogDemo() {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Icon name="calendar" className="mr-2" size={16} />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="smile" className="mr-2" size={16} />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Icon name="rocket" className="mr-2" size={16} />
                  <span>Launch</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </>
      );
    }

    return <DialogDemo />;
  },
};
