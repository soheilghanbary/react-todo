import { getCurrentDate } from "@/lib/functions/currentDate";
import { useDoneTodo, useRemoveTodo, useTodos } from "@/lib/hooks/use-todos";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const TaskList = () => {
  const { data, isLoading } = useTodos()
  if (isLoading) return <p>loading ...</p>
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Tasks: {data?.length}</h3>
      <AnimatePresence mode="wait">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data?.map(task => <TaskItem key={task.id} {...task} />)}
        </ul>
      </AnimatePresence>
    </div>
  )
};

const TaskItem = ({ id, title, date, done }: Todo) => {
  const { mutateAsync, isPending } = useRemoveTodo()
  const { mutateAsync: doneTodoMutation, isPending: isDoning } = useDoneTodo()
  const removeTodo = async () => {
    await mutateAsync(id)
    toast.error('Task removed successfully')
  }
  const doneTodo = async () => {
    await doneTodoMutation({ id, done })
    toast.info('Task removed successfully')
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className={cn({ 'text-muted-foreground line-through': done })}>{title}</CardTitle>
          <CardDescription>
            {getCurrentDate(date)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-x-2">
          <Button onClick={removeTodo} disabled={isPending} size={'icon'} variant={'destructive'}>
            <TrashIcon className="size-4" />
          </Button>
          <Button onClick={doneTodo} disabled={isDoning} size={'icon'} variant={'secondary'}>
            <BadgeCheck className="size-4 text-teal-500" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
};