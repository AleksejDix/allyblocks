import type { Meta, StoryObj } from "@storybook/react";
import {
  ActionMenu,
  ActionMenuTrigger,
  ActionMenuContent,
  ActionMenuItem,
  ActionMenuGroup,
  ActionMenuLabel,
  ActionMenuSeparator,
  ActionMenuCheckboxItem,
  ActionMenuRadioGroup,
  ActionMenuRadioItem,
} from "./ActionMenu";
import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import React from "react";
import { ActionSplit } from "@/components/molecules/ActionSplit";

const notify = (message: string) => {
  console.log(message);
};

const meta: Meta<typeof ActionMenu> = {
  component: ActionMenu,
  tags: ["autodocs"],
  parameters: {
    nuqs: {
      disabled: true,
    },
  },
  argTypes: {
    onValueChange: {
      action: "value changed",
      description: "Callback when any action in the menu is executed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionMenu>;

// Local type for story examples only
type MenuAction = {
  label: string;
  type: string;
  before?: ReactNode;
  after?: ReactNode;
  payload?: Record<string, unknown>;
  props?: Record<string, unknown> & { disabled?: boolean; className?: string };
};

// Example actions
const sampleActions: MenuAction[] = [
  {
    label: "Edit",
    type: "edit",
    before: <Icon name="edit" />,
    payload: { action: "modify" },
  },
  {
    label: "Copy",
    type: "copy",
    before: <Icon name="copy" />,
  },
  {
    label: "Download",
    type: "download",
    before: <Icon name="download" />,
  },
  {
    label: "Share",
    type: "share",
    before: <Icon name="share" />,
  },
  {
    label: "Delete",
    type: "delete",
    before: <Icon name="trash" />,
    props: { className: "text-destructive" },
  },
];

// Basic example
export const Basic: Story = {
  render: () => {
    const handleAction = (type: string, payload?: Record<string, unknown>) => {
      notify(
        `${type} action triggered${payload ? ` with payload: ${JSON.stringify(payload)}` : ""}`
      );
    };

    return (
      <ActionMenu>
        <ActionMenuTrigger>
          <Button variant="outline">
            Actions
            <Icon name="more-horizontal" className="ml-2" />
          </Button>
        </ActionMenuTrigger>
        <ActionMenuContent>
          {sampleActions.map((action, index) => (
            <ActionMenuItem
              key={index}
              className={action.props?.className as string}
              disabled={action.props?.disabled as boolean}
              onAction={() => handleAction(action.type, action.payload)}
            >
              {action.before && <span>{action.before}</span>}
              {action.label}
              {action.after && <span className="ml-2">{action.after}</span>}
            </ActionMenuItem>
          ))}
        </ActionMenuContent>
      </ActionMenu>
    );
  },
};

// With individual items directly
export const WithIndividualItems: Story = {
  render: () => {
    return (
      <ActionMenu>
        <ActionMenuTrigger>
          <Button>More Options</Button>
        </ActionMenuTrigger>
        <ActionMenuContent>
          <ActionMenuItem onAction={() => notify("Edit action triggered")}>
            <Icon name="edit" />
            Edit Document
          </ActionMenuItem>
          <ActionMenuItem onAction={() => notify("Download action triggered")}>
            <Icon name="download" />
            Download
          </ActionMenuItem>
          <ActionMenuItem
            className="text-destructive"
            onAction={() => notify("Delete action triggered")}
          >
            <Icon name="trash" />
            Delete
          </ActionMenuItem>
        </ActionMenuContent>
      </ActionMenu>
    );
  },
};

// With Payload
export const WithPayload: Story = {
  render: () => {
    const itemActions: MenuAction[] = [
      {
        label: "Edit Item #123",
        type: "edit",
        before: <Icon name="edit" />,
        payload: { id: "123", name: "Sample Item" },
      },
      {
        label: "Delete Item #123",
        type: "delete",
        before: <Icon name="trash" />,
        payload: { id: "123", name: "Sample Item" },
        props: { className: "text-destructive" },
      },
    ];

    return (
      <ActionMenu>
        <ActionMenuTrigger>
          <Button>Item Actions</Button>
        </ActionMenuTrigger>
        <ActionMenuContent>
          {itemActions.map((action, index) => (
            <ActionMenuItem
              key={index}
              className={action.props?.className as string}
              disabled={action.props?.disabled as boolean}
              onAction={() => {
                notify(
                  `${action.type} action triggered for item: ${action.payload?.id}`
                );
              }}
            >
              {action.before && <span>{action.before}</span>}
              {action.label}
              {action.after && <span className="ml-2">{action.after}</span>}
            </ActionMenuItem>
          ))}
        </ActionMenuContent>
      </ActionMenu>
    );
  },
};

// With Disabled Item
export const WithDisabledItem: Story = {
  render: () => {
    const actionsWithDisabled: MenuAction[] = [
      ...sampleActions.slice(0, 3),
      {
        label: "Premium Feature",
        type: "premium",
        before: <Icon name="download" />,
        props: { disabled: true },
      },
      ...sampleActions.slice(3),
    ];

    return (
      <ActionMenu>
        <ActionMenuTrigger>
          <Button>Actions</Button>
        </ActionMenuTrigger>
        <ActionMenuContent>
          {actionsWithDisabled.map((action, index) => (
            <ActionMenuItem
              key={index}
              className={action.props?.className as string}
              disabled={action.props?.disabled as boolean}
              onAction={() => notify(`${action.type} action triggered`)}
            >
              {action.before && <span>{action.before}</span>}
              {action.label}
              {action.after && <span className="ml-2">{action.after}</span>}
            </ActionMenuItem>
          ))}
        </ActionMenuContent>
      </ActionMenu>
    );
  },
};

// With IconButton trigger
export const WithIconButtonTrigger: Story = {
  render: () => {
    return (
      <ActionMenu>
        <ActionMenuTrigger>
          <IconButton variant="outline" aria-label="More options">
            <Icon name="more-horizontal" />
          </IconButton>
        </ActionMenuTrigger>
        <ActionMenuContent>
          {sampleActions.map((action, index) => (
            <ActionMenuItem
              key={index}
              className={action.props?.className as string}
              disabled={action.props?.disabled as boolean}
              onAction={() => notify(`${action.type} action triggered`)}
            >
              {action.before && <span>{action.before}</span>}
              {action.label}
              {action.after && <span className="ml-2">{action.after}</span>}
            </ActionMenuItem>
          ))}
        </ActionMenuContent>
      </ActionMenu>
    );
  },
};

// With Root Action Handler
export const WithRootActionHandler: Story = {
  render: () => {
    const handleValueChange = (
      value: string,
      _event: Event,
      context?: Record<string, unknown>
    ) => {
      notify(
        `Root handler: ${value} action executed ${context ? `with context: ${JSON.stringify(context)}` : ""}`
      );
    };

    return (
      <ActionMenu onValueChange={handleValueChange}>
        <ActionMenuTrigger>
          <Button>Centralized Actions</Button>
        </ActionMenuTrigger>
        <ActionMenuContent>
          <ActionMenuItem value="edit" context={{ itemId: "doc-123" }}>
            <Icon name="edit" />
            Edit Document
          </ActionMenuItem>
          <ActionMenuItem
            value="share"
            context={{ itemId: "doc-123", permissions: "read" }}
          >
            <Icon name="share" />
            Share Document
          </ActionMenuItem>
          <ActionMenuItem
            className="text-destructive"
            value="delete"
            context={{ itemId: "doc-123" }}
          >
            <Icon name="trash" />
            Delete Document
          </ActionMenuItem>
        </ActionMenuContent>
      </ActionMenu>
    );
  },
};

// With Both Local and Root Action Handlers
export const WithBothActionHandlers: Story = {
  render: () => {
    const handleValueChange = (
      value: string,
      _event: Event,
      context?: Record<string, unknown>
    ) => {
      notify(
        `Root handler: ${value} action executed ${context ? `with context: ${JSON.stringify(context)}` : ""}`
      );
    };

    return (
      <ActionMenu onValueChange={handleValueChange}>
        <ActionMenuTrigger>
          <Button>Combined Handlers</Button>
        </ActionMenuTrigger>
        <ActionMenuContent>
          <ActionMenuItem
            value="edit"
            context={{ itemId: "doc-123" }}
            onAction={() => console.log("Local edit handler executed")}
          >
            <Icon name="edit" />
            Edit Document (both handlers)
          </ActionMenuItem>
          <ActionMenuItem
            value="share"
            context={{ itemId: "doc-123", permissions: "read" }}
            // No local action, only root handler
          >
            <Icon name="share" />
            Share Document (root handler only)
          </ActionMenuItem>
          <ActionMenuItem
            className="text-destructive"
            // No value, only local handler
            onAction={() => notify("Local delete handler executed")}
          >
            <Icon name="trash" />
            Delete Document (local handler only)
          </ActionMenuItem>
        </ActionMenuContent>
      </ActionMenu>
    );
  },
};

// Centralized Action Handling with Context Pattern
export const CentralizedActionHandling: Story = {
  render: () => {
    // A centralized action handler that could be in a context provider
    // or a custom hook in a real application
    const handleValueChange = (
      value: string,
      _event: Event,
      context?: Record<string, unknown>
    ) => {
      // In a real app, this would likely be a switch statement or object lookup
      // that maps action values to their handlers
      if (value === "document:edit") {
        const docId = context?.id as string;
        notify(`📝 Opening editor for document ${docId}`);
      } else if (value === "document:share") {
        const docId = context?.id as string;
        const shareType = context?.shareType as string;
        notify(`🔗 Sharing document ${docId} via ${shareType}`);
      } else if (value === "document:delete") {
        const docId = context?.id as string;
        notify(`🗑️ Deleting document ${docId}`);
      }
    };

    // Simulate documents from an API or database
    const documents = [
      { id: "doc-1", title: "Quarterly Report", type: "report" },
      { id: "doc-2", title: "Product Roadmap", type: "presentation" },
    ];

    return (
      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-4">Document Library</h3>
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between p-2 border-b"
            >
              <div>
                <span className="font-medium">{doc.title}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({doc.type})
                </span>
              </div>
              <ActionMenu onValueChange={handleValueChange}>
                <ActionMenuTrigger>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="More options"
                  >
                    <Icon name="more-horizontal" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent>
                  <ActionMenuItem
                    value="document:edit"
                    context={{ id: doc.id, type: doc.type }}
                  >
                    <Icon name="edit" />
                    Edit
                  </ActionMenuItem>
                  <ActionMenuItem
                    value="document:share"
                    context={{ id: doc.id, type: doc.type, shareType: "email" }}
                  >
                    <Icon name="mail" />
                    Share via Email
                  </ActionMenuItem>
                  <ActionMenuItem
                    value="document:share"
                    context={{ id: doc.id, type: doc.type, shareType: "link" }}
                  >
                    <Icon name="link" />
                    Copy Link
                  </ActionMenuItem>
                  <ActionMenuItem
                    className="text-destructive"
                    value="document:delete"
                    context={{ id: doc.id }}
                  >
                    <Icon name="trash" />
                    Delete
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};

// Table Row Actions
export const TableRowActions: Story = {
  render: () => {
    // Mock table data
    const users = [
      { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
    ];

    const handleAction = (type: string, userId: string, userName: string) => {
      switch (type) {
        case "edit":
          notify(`Editing user ${userName} (ID: ${userId})`);
          break;
        case "delete":
          notify(`Deleting user ${userName} (ID: ${userId})`);
          break;
        case "permissions":
          notify(`Managing permissions for ${userName} (ID: ${userId})`);
          break;
        default:
          notify(`Action ${type} for user ${userName} (ID: ${userId})`);
      }
    };

    return (
      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-4">Users</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 text-right">
                  <ActionMenu>
                    <ActionMenuTrigger>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        aria-label="More options"
                      >
                        <Icon name="more-vertical" />
                      </IconButton>
                    </ActionMenuTrigger>
                    <ActionMenuContent>
                      <ActionMenuItem
                        onAction={() =>
                          handleAction("edit", user.id, user.name)
                        }
                      >
                        <Icon name="edit" />
                        Edit User
                      </ActionMenuItem>
                      <ActionMenuItem
                        onAction={() =>
                          handleAction("permissions", user.id, user.name)
                        }
                      >
                        <Icon name="shield" />
                        Permissions
                      </ActionMenuItem>
                      <ActionMenuItem
                        className="text-destructive"
                        onAction={() =>
                          handleAction("delete", user.id, user.name)
                        }
                      >
                        <Icon name="trash" />
                        Delete User
                      </ActionMenuItem>
                    </ActionMenuContent>
                  </ActionMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

// Advanced Menu with Groups, Separators, Checkboxes and Radio Items
export const AdvancedMenuStructure: Story = {
  render: () => {
    function AdvancedMenuDemo() {
      const [smartFiltering, setSmartFiltering] = React.useState(true);
      const [notificationsEnabled, setNotificationsEnabled] =
        React.useState(true);
      const [sortOrder, setSortOrder] = React.useState("newest");

      // Log all actions centrally
      const handleValueChange = (
        value: string,
        _event: Event,
        context?: Record<string, unknown>
      ) => {
        console.log(value, context);
        if (value === "filter:toggle") {
          notify(
            `Global handler: Smart filtering ${context?.checked ? "enabled" : "disabled"}`
          );
        } else if (value === "sort:change") {
          notify(
            `Global handler: Sort order changed to ${context?.radioValue}`
          );
        }
      };

      // Local action handlers
      const handleNotificationToggle = (checked: boolean) => {
        notify(
          `Local handler: Notifications ${checked ? "enabled" : "disabled"}`
        );
      };

      return (
        <ActionMenu onValueChange={handleValueChange}>
          <ActionMenuTrigger>
            <Button>
              Advanced Menu
              <Icon name="chevron-down" className="ml-2" />
            </Button>
          </ActionMenuTrigger>
          <ActionMenuContent>
            <ActionMenuLabel>Items</ActionMenuLabel>
            <ActionMenuGroup>
              <ActionMenuItem
                value="refresh"
                onAction={() => notify("Refreshing items...")}
              >
                <Icon name="refresh-ccw" />
                Refresh
              </ActionMenuItem>
              <ActionMenuItem
                value="duplicate"
                onAction={() => notify("Duplicating...")}
              >
                <Icon name="copy" />
                Duplicate
              </ActionMenuItem>
            </ActionMenuGroup>

            <ActionMenuSeparator />

            <ActionMenuLabel>Preferences</ActionMenuLabel>
            <ActionMenuGroup>
              <ActionMenuCheckboxItem
                checked={smartFiltering}
                onCheckedChange={setSmartFiltering}
                value="filter:toggle"
                context={{ setting: "smartFilter" }}
              >
                Smart Filtering (global handler)
              </ActionMenuCheckboxItem>
              <ActionMenuCheckboxItem
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                onAction={handleNotificationToggle}
              >
                Notifications (local handler)
              </ActionMenuCheckboxItem>
            </ActionMenuGroup>

            <ActionMenuSeparator />

            <ActionMenuLabel>Sort Order</ActionMenuLabel>
            <ActionMenuRadioGroup
              value={sortOrder}
              onValueChange={setSortOrder}
            >
              <ActionMenuRadioItem
                value="newest"
                onAction={() => notify(`Sorted by newest first`)}
              >
                Newest First
              </ActionMenuRadioItem>
              <ActionMenuRadioItem
                value="oldest"
                onAction={() => notify(`Sorted by oldest first`)}
              >
                Oldest First
              </ActionMenuRadioItem>
              <ActionMenuRadioItem
                value="alphabetical"
                onAction={() => notify(`Sorted alphabetically`)}
              >
                Alphabetical
              </ActionMenuRadioItem>
            </ActionMenuRadioGroup>

            <ActionMenuSeparator />

            <ActionMenuItem
              value="help"
              onAction={() => notify("Opening help...")}
            >
              <Icon name="help-circle" />
              Help & Documentation
            </ActionMenuItem>
          </ActionMenuContent>
        </ActionMenu>
      );
    }

    return <AdvancedMenuDemo />;
  },
};

// Split Button Pattern
export const SplitButtonPattern: Story = {
  render: () => {
    function SplitButtonDemo() {
      // Example actions with handlers
      const handleEdit = () => notify("Editing document");
      const handleShare = () => notify("Sharing document");
      const handleCopy = () => notify("Copying document");
      const handleDelete = () => notify("Deleting document");

      // Handle primary onAction (the main button)
      const handlePrimaryAction = () => {
        notify("Primary action: Saving document");
      };

      return (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Split Button Pattern</h3>

          <ActionSplit className="w-fit">
            <Button onClick={handlePrimaryAction}>
              <Icon name="save" className="mr-2" />
              Save
            </Button>

            <ActionMenu>
              <ActionMenuTrigger>
                <IconButton
                  variant="default"
                  size="md"
                  aria-label="More options"
                >
                  <Icon name="chevron-down" />
                </IconButton>
              </ActionMenuTrigger>
              <ActionMenuContent>
                <ActionMenuItem onAction={handleEdit}>
                  <Icon name="edit" />
                  Edit
                </ActionMenuItem>
                <ActionMenuItem onAction={handleShare}>
                  <Icon name="share" />
                  Share
                </ActionMenuItem>
                <ActionMenuItem onAction={handleCopy}>
                  <Icon name="copy" />
                  Duplicate
                </ActionMenuItem>
                <ActionMenuSeparator />
                <ActionMenuItem
                  className="text-destructive"
                  onAction={handleDelete}
                >
                  <Icon name="trash" />
                  Delete
                </ActionMenuItem>
              </ActionMenuContent>
            </ActionMenu>
          </ActionSplit>

          <h3 className="text-lg font-medium mt-8">With Different Variants</h3>
          <div className="flex gap-4">
            <ActionSplit variant="outline">
              <Button
                variant="outline"
                onClick={() => notify("Primary outline action")}
              >
                <Icon name="save" className="mr-2" />
                Save
              </Button>
              <ActionMenu>
                <ActionMenuTrigger>
                  <IconButton
                    variant="outline"
                    size="md"
                    aria-label="More options"
                  >
                    <Icon name="chevron-down" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent>
                  <ActionMenuItem onAction={() => notify("Edit clicked")}>
                    <Icon name="edit" />
                    Edit
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => notify("Share clicked")}>
                    <Icon name="share" />
                    Share
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </ActionSplit>

            <ActionSplit variant="secondary">
              <Button
                variant="secondary"
                onClick={() => notify("Primary secondary action")}
              >
                <Icon name="save" className="mr-2" />
                Save
              </Button>
              <ActionMenu>
                <ActionMenuTrigger>
                  <IconButton variant="secondary" aria-label="More options">
                    <Icon name="chevron-down" />
                  </IconButton>
                </ActionMenuTrigger>
                <ActionMenuContent>
                  <ActionMenuItem onAction={() => notify("Edit clicked")}>
                    <Icon name="edit" />
                    Edit
                  </ActionMenuItem>
                  <ActionMenuItem onAction={() => notify("Share clicked")}>
                    <Icon name="share" />
                    Share
                  </ActionMenuItem>
                </ActionMenuContent>
              </ActionMenu>
            </ActionSplit>
          </div>
        </div>
      );
    }

    return <SplitButtonDemo />;
  },
};
