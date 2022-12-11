import { model, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface ITodo {
    text: string;
}

// 2. Create a Schema corresponding to the document interface.
const todoSchema = new Schema<ITodo>({
    text: {
        type: String,
        trim: true,
        required: true
    },
});

//   3. Create  or retrieve a Model
const Todo = model('Todo', todoSchema);

export {
    Todo,
    todoSchema,
    ITodo
};
