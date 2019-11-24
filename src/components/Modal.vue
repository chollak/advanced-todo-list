<template>
  <div class="modal-wrap">
    <!-- <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#openModal">Add Task</button> -->
    <!-- Modal -->
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
            <h5 class="modal-title" id="openModalLabel">{{modalTitle}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-right mb-2">
              <span>
                <img src="/static/images/starred.svg" alt="Starred" @click="addFilter('starred')" />
              </span>
              <span>
                <img
                  src="/static/images/important.svg"
                  alt="Important"
                  @click="addFilter('important')"
                />
              </span>
              <span>
                <img src="/static/images/tag.svg" alt="Trashed" />
              </span>
              <div class="labels">
                <div v-for="l in allLabels" :key="l.name">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="l.name"
                    v-model="todo.labels"
                    :id="l.name"
                  />
                  <label class="form-check-label" :for="l.name">{{l.name}}</label>
                </div>
              </div>
            </div>
            <input type="text" class="form-control mb-2" placeholder="Title" v-model="todo.title" />
            <textarea
              name
              id
              cols="30"
              rows="10"
              class="form-control"
              placeholder="Add description"
              v-model="todo.description"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      todo: Object,
      modalTitle: String
  },
  data() {
    return {
      isModal: false
    };
  },
  mounted(){
      
  },
  methods: {
    addFilter(filter) {
      if (this.todo.filters.indexOf(filter) == -1) {
        this.todo.filters.push(filter);
      } else {
        this.todo.filters.splice(this.todo.filters.indexOf(filter), 1);
      }
    },
    submit() {
      let tmp = [];
      this.todo.labels.forEach(item => {
        this.allLabels.forEach(label => {
          if (label.name == item) {
            tmp.push(label);
          }
        });
      });
      this.todo.labels = tmp;
      this.$store.dispatch("addTodo", this.todo);
      this.clearData();
    },
    clearData() {
      this.todo = {
        id: null,
        title: "",
        description: "",
        filters: [],
        labels: []
      };
    }
  },
  computed: {
    allLabels() {
      return this.$store.state.allLabels;
    },    
  }
};
</script>

<style>
.drop {
  position: relative;
}
.drop-items {
  position: absolute;
  right: 0;
  /* height: 100px;
  width: 100px; */
  background: red;
}
</style>