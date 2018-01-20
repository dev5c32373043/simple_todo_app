import request from './';

export const get = async ()=>{
  const resp = await request('/todos', 'GET');
  return await resp.json();
}

export const create = async (todo)=>{
  const resp = await request('/todos', 'POST', todo);
  return await resp.json();
}

export const update = async (todo)=>{
  const resp = await request(`/todos/${todo._id}`, 'PATCH', todo)
  return await resp.json();
}

export const remove = async (id)=>{
  return await request(`/todos/${id}`, 'DELETE')
}
