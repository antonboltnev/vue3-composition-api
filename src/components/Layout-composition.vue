<template>
  <div class='layout'>
    <div class="filters">
      <h2>FILTERS</h2>
      <div class="inputs">
        <div class="input_wrapper">
          <p>Filter by name</p>
          <select
              class="filters__select"
              v-model="filter.name"
              @change="applyFilters('name', filter.name)"
          >
            <option
                v-for="option in nameOptions"
                :key="option"
            >
              {{option}}
            </option>
          </select>
        </div>
        <div class="input_wrapper">
          <p>Filter by age</p>
          <select
              class="filters__select"
              v-model="filter.age"
              @change="applyFilters('age', filter.age)"
          >
            <option
                v-for="option in ageOptions"
                :key="option"
            >
              {{option}}
            </option>
          </select>
        </div>
        <div class="input_wrapper">
          <p>Filter by grade</p>
          <select
              class="filters__select"
              v-model="filter.grade"
              @change="applyFilters('grade', filter.grade)"
          >
            <option
                v-for="option in gradeOptions"
                :key="option"
            >
              {{option}}
            </option>
          </select>
        </div>
        <div class="input_wrapper">
          <p>Filter by language</p>
          <select
              class="filters__select"
              v-model="filter.language"
              @change="applyFilters('language', filter.language)"
          >
            <option
                v-for="option in languageOptions"
                :key="option"
            >
              {{option}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="list">
      <h2>DATA LIST</h2>
      <div class="headers">
        <div class="headers__item">Name</div>
        <div class="headers__item">Age</div>
        <div class="headers__item">Job</div>
        <div class="headers__item">Grade</div>
        <div class="headers__item">Language</div>
      </div>
      <div class="add_user">
        <input
            type="text"
            v-model="newUser.name"
            placeholder="Name"
        >
        <input
            type="text"
            v-model="newUser.age"
            placeholder="Age"
        >
        <input
            type="text"
            v-model="newUser.job"
            placeholder="Job"
        >
        <input
            type="text"
            v-model="newUser.grade"
            placeholder="Grade"
        >
        <input
            type="text"
            v-model="newUser.language"
            placeholder="Language"
        >
        <button @click="addUser">Add</button>
      </div>
      <User
          v-for="user in localState.filteredUsers"
          :key="user.id"
          :user_data="user"
      />
    </div>
  </div>
</template>

<script>
  import User from './User'
  import { onMounted, reactive, watch, computed } from '@vue/composition-api'
  import { useStore } from '../vuex/store'

  export default {
    name: "layout-composition",
    components: {
      User
    },
    setup() {
      const { state, dispatch } = useStore()
      const { getUsers } = users()

      const localState = reactive({
        filteredUsers: [],
      })

      function users() {
        const newUser = reactive({
          name: '',
          age: '',
          job: '',
          grade: '',
          language: ''
        })

        function getUsers() {
          dispatch('FETCH_USERS')
        }

        function addUser() {
          let user = {
            id: state.users.length + 1,
            ...newUser
          }

          dispatch('ADD_NEW_USER', user)
          getUsers()
        }

        return {newUser, getUsers, addUser}
      }

      function filters() {
        const filter = reactive({
          name: 'ALL',
          age: 'ALL',
          grade: 'ALL',
          language: 'ALL'
        })

        const nameOptions = computed(() => getOptions('name'))
        const ageOptions = computed(() => getOptions('age'))
        const gradeOptions = computed(() => getOptions('grade'))
        const languageOptions = computed(() => getOptions('language'))

        function getOptions(key) {
          let result = ['ALL']
          localState.filteredUsers.map((item) => {
            result.push(item[key].toLowerCase())
          })
          return result = [...new Set(result)]
        }

        function applyFilters(key, value) {
          if (value === 'ALL') {
            localState.filteredUsers = [...state.users]
          } else {
            localState.filteredUsers = localState.filteredUsers.filter((item) => item[key].toLowerCase() === value)
          }
        }


        return {filter, nameOptions, ageOptions, gradeOptions,languageOptions, applyFilters}
      }

      onMounted(() => {
        getUsers()
        watch(() => (state.appLoaded, state.users), () => {
          localState.filteredUsers = [...state.users]
        })
      })

      return {localState, ...users(), ...filters()}
    }
  }
</script>
