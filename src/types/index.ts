import { z } from 'zod';

/** Issues */
export const issuesStatesSchema = z.enum(['open', 'in_progress', 'closed']);
export const issuesPrioritySchema = z.enum(['low', 'medium', 'hight']);

export interface IssueFilters {
  state?: string;
  priority?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface Pagination {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export const issueSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  state: issuesStatesSchema,
  priority: issuesPrioritySchema,
  createdAt: z.string(),
  author: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
  userAssigned: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
});

export type Issue = z.infer<typeof issueSchema>;
export type IssueState = z.infer<typeof issuesStatesSchema>
export type IssueFormData = Pick<
  Issue,
  'title' | 'description' | 'priority' | 'state'
>;

// User
export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  assignedIssues: z.array(issueSchema).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type UserLoginFormData = Pick<User, 'email' | 'password'>;
