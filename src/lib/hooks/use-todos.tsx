import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import client from "../services/client"

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await client.get('/todos')
      return res.data as Todo[]
    },
  })
}

export const useAddTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['addTodo'],
    mutationFn: async (todo: Todo) => {
      const res = await client.post('/todos', todo)
      return res.data as Todo
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}

export const useRemoveTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['removeTodo'],
    mutationFn: async (todoId: string) => {
      const res = await client.delete(`/todos/${todoId}`)
      return res.data as Todo
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  }) 
}

export const useDoneTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['doneTodo'],
    mutationFn: async ({id, done }: { id: string, done: boolean}) => {
      const res = await client.patch(`/todos/${id}`, {
        done: !done
      })
      return res.data as Todo
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}