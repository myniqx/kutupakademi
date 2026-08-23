'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export type ConfirmRequest = {
  title: string
  description: string
  confirmLabel: string
  /** Destructive actions get a red confirm button. */
  destructive?: boolean
  onConfirm: () => void | Promise<void>
}

export function ConfirmDialog({
  request,
  onOpenChange,
  isBusy = false,
}: {
  /** Null closes the dialog; a request opens it with that content. */
  request: ConfirmRequest | null
  onOpenChange: (open: boolean) => void
  isBusy?: boolean
}) {
  return (
    <Dialog open={Boolean(request)} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{request?.title}</DialogTitle>
          <DialogDescription>{request?.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isBusy}>
            Vazgeç
          </Button>
          <Button
            variant={request?.destructive ? 'destructive' : 'default'}
            onClick={() => request?.onConfirm()}
            disabled={isBusy}
          >
            {isBusy ? 'İşleniyor...' : request?.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
