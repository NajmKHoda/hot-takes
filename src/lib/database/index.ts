import mongoose from 'mongoose';
import {User} from './user';
import {Post} from './post';
import {Session} from './session';

// Re-export all models
export {User, Post, Session};
export type {IUser} from './user';
export type {IPost} from './post';
export type {IMessage} from './message';

// Export mongoose for convenience
export {mongoose};
