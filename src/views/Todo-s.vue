<template>
  <div class="container">
    <div class="row">
      
      <div class="col-md-3">
        <div class="sidebar">
          <div class="sidebar__section">
            <button
              class="btn btn-primary btn-block"
              data-toggle="modal"
              data-target="#openModal"
            >Add Task</button>
            <Modal :todo="todo" :modalTitle="modalTitle" />
            <div class="sidebar-menu">
              <div class="sidebar-menu__item">
                <img src alt />
                <span @click="currentFilter='all'">All</span>
              </div>
            </div>
          </div>
          <div class="sidebar__section">
            <div class="sidebar__header">
              <h5>Filters</h5>
            </div>
            <div class="sidebar-menu filters">
              <div
                class="sidebar-menu__item filter"
                v-for="filter in allFilters"
                :key="filter.name"
              >
                <img :src="filter.img" alt />
                <span @click="setFilter(filter.name)">{{filter.name}}</span>
              </div>
            </div>
          </div>
          <div class="sidebar__section">
            <div class="sidebar__header">
              <h5>Labels</h5>
            </div>
            <div class="sidebar-menu labels">
              <div class="sidebar-menu__item label" v-for="label in allLabels" :key="label.name">
                <span :class="[label.color]" class="label-icon"></span>
                <span @click="setFilter(label.name)">{{label.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="col-md-9">
        <div class="main-todo">
          <input type="text" class="form-control mb-3" placeholder="search" />
          <div class="list-group">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              v-for="todo in filteredTodos"
              :key="todo.id"
              @click="setTodo(todo)"
              data-toggle="modal"
              data-target="#openModal"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{todo.title}}</h5>
                <small>
                  <img src="/static/images/starred.svg" alt="Starred" />
                  <img src="/static/images/important.svg" alt="Important" />
                  <img src="/static/images/trashed.svg" alt="Trashed" />
                </small>
              </div>
              <p class="mb-1">{{todo.description}}</p>
              <small>
                <span
                  class="badge badge-pill badge-light"
                  v-for="label in todo.labels"
                  :key="label.name"
                >
                  <!-- <span class="label-icon" :class="[label.color]"></span> -->
                  {{label.name}}
                </span>
              </small>
            </a>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "todo",
  components: {
    Modal
  },
  data() {
    return {
      todo: {
        id: null,
        title: "",
        description: "",
        filters: [],
        labels: []
      },
      modalTitle: "Add task",
      // todos: [
      //   {
      //     id:1,
      //     title:"Test",
      //     description:"ldlasdla",
      //     filters:["starred"],
      //     labels:[{name:"fsdfs",color:"sdfsdfsd"}],
      //   }
      // ]
      currentFilter: "all"
    };
  },
  mounted() {},
  computed: {
    setModalTodo() {
      return this.todos[0];
    },
    allFilters() {
      return this.$store.state.allFilters;
    },
    allLabels() {
      return this.$store.state.allLabels;
    },
    todos() {
      return this.$store.state.todos;
    },
    filteredTodos() {
      let obj = this.todos.filter(
        f =>
          this.currentFilter == "all" ||
          f.filters.indexOf(this.currentFilter) != -1 ||
          f.labels.map(e => e.name).indexOf(this.currentFilter) != -1
      );
      return obj;
    }
  },
  methods: {
    setFilter(filterBy) {
      this.currentFilter = filterBy;
      console.log(this.filteredTodos);
    },
    setTodo(todo) {
      this.todo = todo;
      this.modalTitle = "Edit task";
    }
  }
};
</script>

<style scoped>
.sidebar,
.main-todo {
  /* background: #eaeaea; */
  height: 500px;
  overflow-y: scroll;
}
.sidebar__section {
  padding: 10px 15px;
  /* background: #eaeaea; */
  border: 1px #eaeaea solid;
}
.sidebar__header {
  padding: 0px 10px;
}
.sidebar-menu__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  /* background: red; */
  padding: 5px 10px;
  margin: 5px 0px;
}
.label-icon {
  /* width: 20px;
  height: 20px; */
  /* max-width: 100%;
  max-height: 100%; */
  width: 1px;
  height: 1px;
  border: 3px solid;
  border-radius: 100%;
}

.l-primary {
  border-color: rgb(115, 103, 240);
}
.l-success {
  border-color: rgb(40, 199, 111);
}
.l-warning {
  border-color: rgb(255, 159, 67);
}
.l-danger {
  border-color: rgb(234, 84, 85);
}
</style>