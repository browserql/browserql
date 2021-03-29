// @ts-ignore
import { Firestore } from '@browserql/firestore-react'
import React, { ComponentType } from 'react'
import { Todo } from './types'

export interface GetTodosProps {
  todos: Todo[]
  loading: boolean
}

export const GetTodos = ({ range = 10 }: { range?: number } = {}) => (
  Component: ComponentType<GetTodosProps>
) => () => (
  <Firestore<Todo> get="Todo" range={range}>
    {(todos: Todo[], loading: true) => <Component {...{ todos, loading }} />}
  </Firestore>
)

export interface ChangeTodoProps {
  changeTodo: any
  changing: boolean
}

export const ChangeTodo = (Component: ComponentType<ChangeTodoProps>) => (
  props: GetTodosProps
) => (
  <Firestore<Todo> change="Todo">
    {(changeTodo: any, loading: boolean) => (
      <Component {...{ ...props, changeTodo, changing: loading }} />
    )}
  </Firestore>
)
