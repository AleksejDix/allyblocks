import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/atoms/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { PlusIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/atoms/Label";
import { Checkbox } from "@/components/atoms/Checkbox";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Basic tooltip message</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me (delayed)</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip with 500ms delay</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithPlacement: Story = {
  render: () => {
    // Create a tooltip with the specified side and alignment
    const TooltipExample = ({
      side,
      align,
      label,
      className = "",
    }: {
      side: "top" | "right" | "bottom" | "left";
      align?: "start" | "center" | "end";
      label: string;
      className?: string;
    }) => (
      <div className={`absolute ${className}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton aria-label={label}>
              <PlusIcon />
            </IconButton>
          </TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p>{`${side}${align ? `-${align}` : ""}`}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );

    return (
      <div className="grid place-content-center border border-yellow-400 h-[50vmin] w-[50vmin]">
        <div className="relative h-32 w-32 border border-dashed">
          {/* Top row */}
          <TooltipExample
            side="top"
            align="start"
            label="top start tooltip"
            className="left-0 bottom-full"
          />
          <TooltipExample
            side="top"
            label="top center tooltip"
            className="left-1/2 bottom-full -translate-x-1/2"
          />
          <TooltipExample
            side="top"
            align="end"
            label="top end tooltip"
            className="right-0 bottom-full"
          />

          {/* Right column */}
          <TooltipExample
            side="right"
            align="start"
            label="right start tooltip"
            className="left-full top-0"
          />
          <TooltipExample
            side="right"
            label="right center tooltip"
            className="left-full top-1/2 -translate-y-1/2"
          />
          <TooltipExample
            side="right"
            align="end"
            label="right end tooltip"
            className="left-full bottom-0"
          />

          {/* Bottom row */}
          <TooltipExample
            side="bottom"
            align="end"
            label="bottom end tooltip"
            className="top-full right-0"
          />
          <TooltipExample
            side="bottom"
            label="bottom center tooltip"
            className="top-full left-1/2 -translate-x-1/2"
          />
          <TooltipExample
            side="bottom"
            align="start"
            label="bottom start tooltip"
            className="top-full left-0"
          />

          {/* Left column */}
          <TooltipExample
            side="left"
            align="end"
            label="left end tooltip"
            className="right-full bottom-0"
          />
          <TooltipExample
            side="left"
            label="left center tooltip"
            className="right-full top-1/2 -translate-y-1/2"
          />
          <TooltipExample
            side="left"
            align="start"
            label="left start tooltip"
            className="right-full top-0"
          />
        </div>
      </div>
    );
  },
};

export const WithCollisionBoundary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how tooltips reposition when they would overflow their custom collision boundary (red dashed box).",
      },
    },
  },
  render: function TooltipCollisionDemo() {
    const boundaryRef = React.useRef<HTMLDivElement>(null);
    const [boundary, setBoundary] = useState<HTMLElement | null>(null);
    const [boundaryEnabled, setBoundaryEnabled] = useState(true);

    // Update boundary when ref is available
    useEffect(() => {
      if (boundaryRef.current) {
        setBoundary(boundaryRef.current);
      }
    }, []);

    // The actual boundary to use based on if it's enabled
    const activeBoundary = boundaryEnabled ? boundary : undefined;

    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-sm text-muted-foreground mb-2">
          Tooltips will reposition to stay within the red dashed boundary
        </p>

        {/* Boundary toggle checkbox */}
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id="boundary-checkbox"
            checked={boundaryEnabled}
            onCheckedChange={(checked) => setBoundaryEnabled(checked === true)}
          />
          <Label htmlFor="boundary-checkbox">Enable collision boundary</Label>
        </div>

        <div
          ref={boundaryRef}
          className="relative border-2 border-dashed border-red-400 background-red-100 w-[280px] h-[200px] p-4 overflow-hidden"
        >
          {/* Corner buttons */}
          <div className="absolute top-4 left-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Top Left">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                Top Left
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Top Center">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                Top Center
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute top-4 right-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Top Right">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                Top Right
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Center Right">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                Center Right
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute bottom-4 right-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Bottom Right">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                <p>Bottom Right</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Bottom Center">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                <p>Bottom Center</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute bottom-4 left-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Bottom Left">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                <p>Bottom Left</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Center Left">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                <p>Center Left</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton variant="outline" aria-label="Center Center">
                  <PlusIcon size={16} />
                </IconButton>
              </TooltipTrigger>
              <TooltipContent collisionBoundary={activeBoundary}>
                <p>Center Center</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          {boundaryEnabled
            ? "Boundary is ON - tooltips will stay within the red box"
            : "Boundary is OFF - tooltips can overflow the red box"}
        </p>
      </div>
    );
  },
};

export const InlineTooltip: Story = {
  render: () => (
    <div className="p-4 max-w-md">
      <p className="text-sm">
        This paragraph contains an{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="border-b border-dotted border-primary text-primary cursor-help">
              inline tooltip{" "}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Additional information about this specific term</p>
          </TooltipContent>
        </Tooltip>
        that appears when you hover over the highlighted text. Inline tooltips
        are useful for providing additional context without interrupting the
        reading flow.
      </p>
    </div>
  ),
};
