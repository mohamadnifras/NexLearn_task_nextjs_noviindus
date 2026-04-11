import React from "react"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { Option } from "@/features/exam/types"

interface OptionListProps {
  options: Option[]
  selectedOptionId: number | null
  onSelectOption: (optionId: number) => void
}

function OptionList({
  options,
  selectedOptionId,
  onSelectOption,
}: OptionListProps) {
    console.log(options, "options")
    console.log(selectedOptionId, "selectedOptionId")
    console.log(onSelectOption, "onSelectOption")
  return (
    <RadioGroup.Root
      className="space-y-3"
      value={selectedOptionId?.toString()}
      onValueChange={(value) => onSelectOption(Number(value))}
    >
      {options.map((option, index) => (
        <label
          key={option.id}
          className={`flex items-center justify-between p-4 rounded-md border cursor-pointer transition
            ${
              selectedOptionId === option.id
                ? 'bg-blue-50 border-PrimaryBg' : 'bg-white hover:bg-gray-100'
            }
          `}
        >
          {/* Left text */}
          <span className="text-sm font-medium text-gray-800">
            {option.option}
          </span>

          {/* Radio */}
          <RadioGroup.Item
            value={option.id.toString()}
            className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
          >
            <RadioGroup.Indicator className="w-2 h-2 bg-black rounded-full" />
          </RadioGroup.Item>
        </label>
      ))}
    </RadioGroup.Root>
  )
}

export default OptionList