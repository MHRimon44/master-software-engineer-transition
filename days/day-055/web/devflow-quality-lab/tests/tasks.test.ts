import { describe,it,expect } from 'vitest';
import { createTask, type Store } from '../lib/tasks';
const fresh = ():Store=>({tasks:[],nextId:1});
describe('task mutation integration',()=>{
 it('rejects anonymous users',()=>expect(()=>createTask(fresh(),null,'Valid task')).toThrow('UNAUTHENTICATED'));
 it('rejects members',()=>expect(()=>createTask(fresh(),'member','Valid task')).toThrow('FORBIDDEN'));
 it('rejects invalid titles',()=>expect(()=>createTask(fresh(),'manager','a')).toThrow());
 it('creates a task for managers',()=>{const store=fresh();expect(createTask(store,'manager','  Write tests  ')).toEqual({id:1,title:'Write tests'});expect(store.tasks).toHaveLength(1);});
 it('creates a task for admins',()=>expect(createTask(fresh(),'admin','Security audit').id).toBe(1));
});
