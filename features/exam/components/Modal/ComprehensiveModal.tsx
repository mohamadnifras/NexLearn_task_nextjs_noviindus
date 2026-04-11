import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,

} from "@/components/ui/dialog"
import Button from '@/components/Button';

interface ComprehensiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  comprehension: string;
}

function ComprehensiveModal({ isOpen, onClose, comprehension }: ComprehensiveModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="max-w-5xl w-[90vw] p-6 lg:max-w-6xl">

        <DialogHeader>
          <DialogTitle className="text-[16px] font-bold">
            Comprehensive Paragraph
          </DialogTitle>
        </DialogHeader>

        <hr />

        <DialogDescription className="text-gray-700 text-[14px] whitespace-pre-wrap">
          {comprehension}
        </DialogDescription>

        <div className="flex justify-end">
          <div className="md:w-[300px] w-[200px]">
            <Button  onClick={onClose} text="Minimize"/>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default ComprehensiveModal