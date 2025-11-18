import type { Meta, StoryObj } from "@storybook/react";
import { PricingSection } from "./PricingSection";

const meta: Meta<typeof PricingSection> = {
  title: "Plans/PricingSection",
  component: PricingSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PricingSection>;

export const Default: Story = {
  render: () => (
    <div className="min-h-[800px] w-full bg-[linear-gradient(135deg,#1a0b3d,#311597_60%,#1a0b3d)] p-8">
      <PricingSection />
    </div>
  ),
};
