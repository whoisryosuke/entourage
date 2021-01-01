import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Stack } from '@chakra-ui/react';
import { Block } from '../../reducers/currentSlice';

interface Props {
  action: Block['action'];
}

const TodoItem = ({ todo, index, toggleTodo }) => {
  const handleCheckbox = useCallback(() => toggleTodo(index), [
    toggleTodo,
    index,
  ]);
  return (
    <Checkbox checked={todo.checked} onClick={handleCheckbox}>
      {todo.name}
    </Checkbox>
  );
};

export const TodoBlock = ({ action }: Props) => {
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    setTodos(action.data.todos);
  }, [action.data.todos]);

  const toggleTodo = (todoId) => {
    setTodos((prevTodos) => {
      const changedTodos = [...prevTodos];
      const changedTodo = { ...changedTodos[todoId] };
      changedTodo.checked = !changedTodos[todoId].checked;
      changedTodos[todoId] = changedTodo;
      return changedTodos;
    });
  };

  return (
    <Stack spacing={3}>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.name}
          todo={todo}
          index={index}
          toggleTodo={toggleTodo}
        />
      ))}
    </Stack>
  );
};

export default TodoBlock;
