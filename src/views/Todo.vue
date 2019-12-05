<template>
  <div class="todo-wrapper mt-5">
    <div class="container">
      <div class="row common">
        <!-- d-none d-lg-block d-md-none -->
        <div class="col-lg-3">
          <div class="sidebar-wrap" :class="{'s-active':isNavActive}" @click="isNavActive=false">
            <div class="sidebar">
              <div class="sidebar-section mb-5 pb-5">
                <button
                  class="btn btn-block mb-3 btn-primary"
                  data-toggle="modal"
                  data-target="#openModal"
                >Add Task</button>
                <a
                  href="#"
                  class="sidebar-menu-item d-flex"
                  :class="{active: currentCategory=='all'}"
                  @click="setCurrentCategory('all')"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  <span class="ml-3">All</span>
                </a>
              </div>
              <div class="sidebar-section mb-5 pb-5">
                <div class="sidebar-menu">
                  <h5>Filters</h5>
                  <a
                    href="#"
                    class="sidebar-menu-item d-flex"
                    @click="setCurrentCategory('starred')"
                    :class="{active: currentCategory=='starred'}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      />
                    </svg>
                    <span class="ml-3">Starred</span>
                  </a>
                  <a
                    href="#"
                    class="sidebar-menu-item d-flex"
                    @click="setCurrentCategory('important')"
                    :class="{active: currentCategory=='important'}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="8" />
                    </svg>
                    <span class="ml-3">Important</span>
                  </a>
                  <a
                    href="#"
                    class="sidebar-menu-item d-flex"
                    @click="setCurrentCategory('completed')"
                    :class="{active: currentCategory=='completed'}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-check h-6 w-6"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span class="ml-3">Completed</span>
                  </a>
                  <a
                    href="#"
                    class="sidebar-menu-item d-flex"
                    @click="setCurrentCategory('trashed')"
                    :class="{active: currentCategory=='trashed'}"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      />
                    </svg>
                    <span class="ml-3">Trashed</span>
                  </a>
                </div>
              </div>
              <!-- /.sidebar-section -->
              <div class="sidebar-section mb-5 pb-5">
                <div class="sidebar-menu">
                  <h5>Labels</h5>
                  <a
                    href="#"
                    class="sidebar-menu-item d-flex align-items-center"
                    v-for="(label, index) in labels"
                    :key="index"
                    :class="{active: currentCategory==label}"
                    @click="setCurrentCategory(label)"
                  >
                    <span class="label-circle mr-4" :class="'label-'+label"></span>
                    <span>{{label}}</span>
                  </a>
                </div>
              </div>
              <!-- /.sidebar-section -->
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="todo-main">
            <div
              class="input-group input-group-sm mb-2 p-2 d-flex align-items-center"
              style="border:#eaeaea solid 1px"
            >
              <span class="mr-2 d-md-block d-lg-none" @click="isNavActive=!isNavActive">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                v-model="search"
                style="border:none;"
              />
            </div>
            <div class="todos">
              <div
                class="todo-item"
                v-for="todo in searchTodos"
                :key="todo.id"
                @click="updateTodo(todo.id)"
                data-toggle="modal"
                data-target="#openModal"
              >
                <div
                  class="todo-header d-flex align-items-center justify-content-between flex-wrap"
                >
                  <div class="d-flex align-items-center flex-wrap">
                    <input
                      type="checkbox"
                      :value="todo.id"
                      :checked="isFilter(todo.filters,'completed')"
                      @change="setFilter(todo.id,'completed')"
                      @click.self.stop
                    />
                    <span
                      class="todo-title mr-3 ml-2"
                      :class="{'text-del':isFilter(todo.filters,'completed')}"
                    >{{todo.title}}</span>
                    <div class="todo-labels d-flex flex-wrap">
                      <span
                        class="badge badge-pill badge-light mr-1 d-flex align-items-center"
                        v-for="label in todo.labels"
                        :key="label"
                      >
                        <span class="label-circle label-dot mr-1" :class="'label-'+label"></span>
                        {{label}}
                      </span>
                    </div>
                  </div>
                  <div class="todo-filters d-flex" @click.stop="updateTodo(todo.id)">
                    <span
                      class="todo-filter"
                      :class="{'text-warning': isFilter(todo.filters,'starred')}"
                      @click="setFilter(todo.id,'starred')"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        />
                      </svg>
                    </span>
                    <span
                      class="todo-filter"
                      :class="{'text-success': isFilter(todo.filters,'important')}"
                      @click="setFilter(todo.id,'important')"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="8" />
                      </svg>
                    </span>
                    <span
                      class="filter-todo"
                      @click="setFilter(todo.id,'trashed')"
                      v-if="todo.filters.indexOf('trashed')==-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="todo-body" :class="{'text-del':isFilter(todo.filters,'completed')}">
                  <p>{{todo.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="openModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="openModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="openModalLabel">Title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between mb-2">
              <div>
                <input
                  v-if="isUpdate"
                  type="checkbox"
                  :value="newTodo.id"
                  :checked="isFilter(newTodo.filters,'completed')"
                  @change="setNewFilter('completed')"
                />
              </div>
              <ul>
                <li>
                  <span
                    class="todo-filter"
                    :class="{'text-warning': isFilter(newTodo.filters,'starred')}"
                    @click="setNewFilter('starred')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <span
                    class="todo-filter"
                    :class="{'text-success': isFilter(newTodo.filters,'important')}"
                    @click="setNewFilter('important')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="8" />
                    </svg>
                  </span>
                </li>
                <li>
                  <img src="/static/images/tag.svg" alt />
                  <ul class="d-dropdown">
                    <li v-for="label in labels" :key="label">
                      <input :id="label" type="checkbox" :value="label" v-model="newTodo.labels" />
                      <label :for="label">{{label}}</label>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Title"
              v-model="newTodo.title"
            />
            <textarea
              name
              id
              cols="30"
              rows="10"
              class="form-control"
              placeholder="Add description"
              v-model="newTodo.description"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="submit()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todo",
  data() {
    return {
      filters: ["starred", "important", "completed", "trashed"],
      // filters: [
      //   { name: "starred" },
      //   { name: "important" },
      //   { name: "completed" },
      //   { name: "trashed" }
      // ],
      labels: ["backend", "frontend", "doc", "bug"],
      currentCategory: "all",

      todos: [],

      newTodo: {
        id: null,
        title: "",
        description: "",
        filters: [],
        labels: []
      },
      isUpdate: false,
      search: "",
      isNavActive: false
    };
  },
  mounted() {
    this.setTodos();
    this.newTodo.id = this.todos.length;
  },
  methods: {
    setTodos() {
      let todos;
      if (localStorage.getItem("todos-local")) {
        todos = JSON.parse(localStorage.getItem("todos-local"));
        this.todos = todos;
      }
    },
    saveTodos() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem("todos-local", parsed);
    },
    setCurrentCategory(category) {
      this.currentCategory = category;
    },
    isFilter(filters, is) {
      if (filters.indexOf(is) == -1) return false;
      return true;
    },

    setFilter(id, filter) {
      let todo = this.todos.find(todo => todo.id == id);
      if (this.isFilter(todo.filters, filter)) {
        todo.filters.splice(todo.filters.indexOf(filter), 1);
      } else {
        todo.filters.push(filter);
      }
      this.todos[this.todos.findIndex(item => item.id == id)] = todo;
      this.saveTodos();
    },
    setNewFilter(filter) {
      if (this.newTodo.filters.indexOf(filter) == -1) {
        this.newTodo.filters.push(filter);
      } else {
        this.newTodo.filters.splice(this.newTodo.filters.indexOf(filter), 1);
      }
    },
    updateTodo(id) {
      let todo = this.todos.find(todo => todo.id == id);

      this.newTodo = todo;
      this.setTodos();
      this.isUpdate = true;
    },
    submit() {
      if (this.todos.findIndex(item => item.id == this.newTodo.id) != -1) {
        this.todos.splice(
          this.todos.findIndex(item => item.id == this.newTodo.id),
          1,
          this.newTodo
        );
      } else {
        this.todos.push(this.newTodo);
      }
      this.clearData();
      this.saveTodos();
      this.setTodos();
      this.isUpdate = false;
    },
    clearData() {
      this.newTodo = {
        id: this.todos.length,
        title: "",
        description: "",
        filters: [],
        labels: []
      };
    }
  },
  computed: {
    searchTodos() {
      return this.filteredTodos.filter(c => {
        return c.title.toLowerCase().match(this.search.toLowerCase());
      });
    },
    filteredTodos() {
      let obj = this.todos.filter(
        f =>
          (this.currentCategory == "all" &&
            f.filters.indexOf("trashed") == -1) ||
          (f.filters.indexOf(this.currentCategory) != -1 &&
            f.filters.indexOf("trashed") == -1) ||
          (f.labels.indexOf(this.currentCategory) != -1 &&
            f.filters.indexOf("trashed") == -1) ||
          (this.currentCategory == "trashed" &&
            f.filters.indexOf(this.currentCategory) != -1)
      );
      return obj;
    }
  }
};
</script>

<style>
.label-circle {
  width: 10px;
  height: 10px;
  border: #000 solid 2px;
  border-radius: 9999px;
}
.label-dot {
  /* width: 100% !important; */
  /* width: 10px;
  height: 100% !important; */
  width: 4px;
  height: 4px;
  display: block !important;
}
/* --vs-primary: 115,103,240;
    --vs-success: 40,199,111;
    --vs-danger: 234,84,85;
    --vs-warning: 255,159,67; */
.label-backend {
  border-color: rgb(115, 103, 240);
}
.label-frontend {
  border-color: rgb(255, 159, 67);
}
.label-doc {
  border-color: rgb(40, 199, 111);
}
.label-bug {
  border-color: rgb(234, 84, 85);
}

.btn-primary {
  color: #fff;
  background-color: rgba(115, 103, 240, 1) !important;
  border-color: rgba(115, 103, 240, 1) !important;
}
.btn-primary:hover {
  box-shadow: 0 8px 25px -8px rgba(115, 103, 240, 1);
}

.common {
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 20px 10px;
  height: 600px;
  position: relative;
  /* overflow-y: scroll; */
}

.sidebar-wrap {
  /* visibility: hidden; */
}
.sidebar {
  height: 570px;
  overflow-y: scroll;
}

.sidebar-section {
  border-bottom: #eaeaea solid 1px;
}
.sidebar-menu-item {
  text-decoration: none;
  color: #000;
  padding: 5px 15px;
}
.sidebar-menu-item:hover {
  color: #000;
  text-decoration: none;
}
.sidebar .active {
  color: rgba(115, 103, 240, 1);
}
.sidebar-menu-item img {
}

.todos {
  height: 500px;
  overflow-y: scroll;
}
.todo-header {
  /* background: red;  */
  padding: 5px 10px;
}
.todo-title {
  font-size: 1.2rem;
  font-weight: 500;
}
.todo-item {
  padding: 10px 15px;
  border: 1px solid #eaeaea;
  cursor: pointer;
  transition: all 0.2s;
}
.todo-item:hover {
  background: #fafafa;
  transform: translateY(-4px);
  box-shadow: 0 3px 10px 0 #ccc;
}

.text-del {
  text-decoration: line-through;
}

ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
}

li {
  display: block;
  float: left;
  position: relative;
  text-decoration: none;
  transition-duration: 0.5s;
}

li:hover {
  cursor: pointer;
}

ul li ul {
  visibility: hidden;
  opacity: 0;
  min-width: 7rem;
  position: absolute;
  transition: all 0.5s ease;
  /* margin-top: 1rem; */
  right: 0;
  display: none;
  background: #eaeaea;
  padding: 5px 10px;
}

ul li:hover > ul,
ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
}

ul li ul li {
  clear: both;
  width: 100%;
}

@media (max-width: 991px) {
  .sidebar-wrap {
    position: absolute;
    /* background: transparent; */
    background: rgba(0, 0, 0, .2);
    z-index: 111;
    top: 0;
    left: 0;    
    width: 0%;
    /* transition: 0.2s all; */
  }
  .sidebar{
    max-width: 220px;
    background: #fff;    
  }
  .s-active {
    width: 100%;
  }
  .s-active .sidebar{
    padding-right: 10px;
    padding-top: 10px;
  }
}
</style>