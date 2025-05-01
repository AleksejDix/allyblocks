import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import * as React from "react";
import { Button } from "@/components/atoms/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "./DropdownMenu";
import {
  User,
  Settings,
  Mail,
  MessageSquare,
  CreditCard,
  LogOut,
} from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const BasicDropdownMenu: Story = {
  render: () => (
    <div className="flex items-center justify-center p-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic dropdown menu with simple items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the button is rendered
    const button = canvas.getByRole("button", { name: "Open Menu" });
    await expect(button).toBeInTheDocument();
  },
};

export const WithIconsAndShortcuts: Story = {
  render: () => (
    <div className="flex items-center justify-center p-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">User Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with icons and keyboard shortcuts.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the button is rendered
    const button = canvas.getByRole("button", { name: "User Menu" });
    await expect(button).toBeInTheDocument();
  },
};

export const WithGroupsAndLabels: Story = {
  render: () => (
    <div className="flex items-center justify-center p-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Messages</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Inbox</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Chat</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with grouped items and labels.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the button is rendered
    const button = canvas.getByRole("button", { name: "Actions" });
    await expect(button).toBeInTheDocument();
  },
};

export const WithCheckboxItems: Story = {
  render: function CheckboxItemsStory() {
    const [showStatusBar, setShowStatusBar] = React.useState(true);
    const [showActivityBar, setShowActivityBar] = React.useState(false);

    return (
      <div className="flex items-center justify-center p-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">View Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with checkbox items that maintain state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the button is rendered
    const button = canvas.getByRole("button", { name: "View Options" });
    await expect(button).toBeInTheDocument();
  },
};

export const WithRadioItems: Story = {
  render: function RadioItemsStory() {
    const [position, setPosition] = React.useState("bottom");

    return (
      <div className="flex items-center justify-center p-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Position</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with radio items for single selection.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the button is rendered
    const button = canvas.getByRole("button", { name: "Position" });
    await expect(button).toBeInTheDocument();
  },
};

export const WithSubmenus: Story = {
  render: () => (
    <div className="flex items-center justify-center p-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Advanced Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Main Action</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>More Options</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>Submenu Item 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Submenu Item 2</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Final Action</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with nested submenus for hierarchical options.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the button is rendered
    const button = canvas.getByRole("button", { name: "Advanced Menu" });
    await expect(button).toBeInTheDocument();
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <div className="flex items-center justify-center p-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Available Action</DropdownMenuItem>
          <DropdownMenuItem disabled>Disabled Action</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Available Action 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown menu with some disabled items that cannot be selected.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the button is rendered
    const button = canvas.getByRole("button", { name: "Actions" });
    await expect(button).toBeInTheDocument();
  },
};

export const WithDestructiveItem: Story = {
  render: () => (
    <div className="flex items-center justify-center p-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Delete Account</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dropdown menu with a destructive item for dangerous actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verify the button is rendered
    const button = canvas.getByRole("button", { name: "Account" });
    await expect(button).toBeInTheDocument();
  },
};

export const ControlledDropdown: Story = {
  render: function ControlledDropdownStory() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Dropdown</Button>
          <Button onClick={() => setOpen(false)} variant="outline">
            Close Dropdown
          </Button>
        </div>
        <div>Status: {open ? "Open" : "Closed"}</div>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Controlled Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates controlled open state using the open and onOpenChange props.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Controlled Menu" });
    await expect(button).toBeInTheDocument();
  },
};

export const NonModalDropdown: Story = {
  render: () => (
    <div className="flex items-center justify-center p-10">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Non-Modal Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Clicking outside won't close this menu
          </DropdownMenuItem>
          <DropdownMenuItem>
            Unless you click the trigger again
          </DropdownMenuItem>
          <DropdownMenuItem>Or press Escape</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Non-modal dropdown menu that allows interactions outside without closing. Using modal={false}.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Non-Modal Menu" });
    await expect(button).toBeInTheDocument();
  },
};

export const WithCustomAlignment: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-8 p-10">
      <div className="grid grid-cols-2 gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Align Start</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" alignOffset={0}>
            <DropdownMenuItem>Aligned to start</DropdownMenuItem>
            <DropdownMenuItem>Of the trigger</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Align End</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" alignOffset={0}>
            <DropdownMenuItem>Aligned to end</DropdownMenuItem>
            <DropdownMenuItem>Of the trigger</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Align Center</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>Aligned to center</DropdownMenuItem>
            <DropdownMenuItem>Of the trigger</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Side & SideOffset</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" sideOffset={10}>
            <DropdownMenuItem>Opens to the right</DropdownMenuItem>
            <DropdownMenuItem>With 10px offset</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows different alignment options with align, alignOffset, side, and sideOffset props.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    await expect(buttons.length).toBe(4);
  },
};

export const WithCollisionHandling: Story = {
  render: () => (
    <div className="flex items-center justify-center p-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Collision Handling</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent collisionPadding={20} avoidCollisions={true}>
          <DropdownMenuItem>Avoids window edges</DropdownMenuItem>
          <DropdownMenuItem>With 20px padding</DropdownMenuItem>
          <DropdownMenuItem>Adjusts position automatically</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Try near window edge</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates collision handling with collisionPadding and avoidCollisions props.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Collision Handling" });
    await expect(button).toBeInTheDocument();
  },
};
