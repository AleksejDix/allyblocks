import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const items = [
  {
    title: "Slide 1",
    content: "This is the first slide content",
  },
  {
    title: "Slide 2",
    content: "This is the second slide content",
  },
  {
    title: "Slide 3",
    content: "This is the third slide content",
  },
  {
    title: "Slide 4",
    content: "This is the fourth slide content",
  },
];

export const Default: Story = {
  render: (args) => (
    <Carousel {...args} className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-square items-center justify-center p-6 border rounded-lg bg-background">
              <span className="text-4xl font-semibold">{item.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Carousel {...args} orientation="vertical" className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-square items-center justify-center p-6 border rounded-lg bg-background">
              <span className="text-4xl font-semibold">{item.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const WithCustomButtons: Story = {
  render: (args) => (
    <Carousel {...args} className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-square items-center justify-center p-6 border rounded-lg bg-background">
              <span className="text-4xl font-semibold">{item.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  ),
};

export const WithMultipleItems: Story = {
  render: (args) => (
    <Carousel {...args} className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="flex aspect-square items-center justify-center p-6 border rounded-lg bg-background">
              <span className="text-4xl font-semibold">{item.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const WithTextContent: Story = {
  render: (args) => (
    <Carousel {...args} className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="flex flex-col aspect-square items-center justify-center p-6 border rounded-lg bg-background">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {item.content}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
