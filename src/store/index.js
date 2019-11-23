import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    allFilters: [
      { img: "/static/images/starred.svg", name: "starred" },
      { img: "/static/images/important.svg", name: "important" },
      { img: "/static/images/completed.svg", name: "completed" },
      { img: "/static/images/trashed.svg", name: "trashed" }
    ],
    allLabels: [
      { color: "l-primary", name: "backend" },
      { color: "l-success", name: "doc" },
      { color: "l-danger", name: "bug" },
      { color: "l-warning", name: "frontend" }
    ],
  },
  getters: {
    filteredTodos: state => filterBy => {      
      let obj = state.todos.filters.filter(f=> f == filterBy);
      return obj;
      // return state.todos.labels.find(label => label.name == filterBy);
    }
  },
  mutations: {
    SET_TODOS: (state, todos) => {
      state.todos = todos;
    },
    SAVE_TODOS: (state) => {
      const parsed = JSON.stringify(state.todos);
      localStorage.setItem("todos-local", parsed);
    },
    ADD_TODO: (state, todo) => {
      todo.id = state.todos.length;
      let obj = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        filters: todo.filters,
        labels: todo.labels
      };
      state.todos.push(obj);
    },
    UPDATE_TODO: (state, todo) => {
      state.todos[state.todos.findIndex(obj => obj.id == todo.id)] = todo;
    },
    DELETE_TODO: (state, id) => {
      state.todos.splice(state.todos.findIndex(obj => obj.id == id), 1);
    }
  },
  actions: {
    addTodo: (context, todo) => {
      context.commit('ADD_TODO', todo);
      context.commit('SAVE_TODOS');
    },
    updateTodo: (context, todo) => {
      context.commit('UPDATE_TODO', todo);
      context.commit('SAVE_TODOS');
    },
    deleteTodo: (context, id) => {
      context.commit('DELETE_TODO', id);
      context.commit('SAVE_TODOS');
    },
    setTodos: (context) => {
      let todos;
      if (localStorage.getItem("todos-local")) {
        todos = JSON.parse(localStorage.getItem("todos-local"));
        context.commit('SET_TODOS', todos);
      }
    }
  },
  modules: {
  }
})
