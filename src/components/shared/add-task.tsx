import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddTodo } from "@/lib/hooks/use-todos";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
const schema = z.object({
  title: z.string().min(1),
})

type Schema = z.infer<typeof schema>

export const AddTask = () => {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit , reset } = useForm<Schema>({
    resolver: zodResolver(schema)
  })
  const { mutate, isPending} = useAddTodo()
  const onSubmit = handleSubmit(async (data) => {
    await mutate({ id: uuid(), ...data, done: false, date: new Date() })
    toast.success('Task created successfully')
    setOpen(false)
    reset()
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <Input type="text" placeholder="task title" {...register('title')} />
          <Button disabled={isPending} type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}