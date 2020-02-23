<template>
  <div class='layout'>
    <div class="filters">
      <h2>FILTERS</h2>
      <div class="inputs">
        <div class="input_wrapper">
          <p>Filter by name</p>
          <select
                  class="filters__select"
                  v-model="filters.name"
                  @change="applyFilters('name', filters.name)"
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
              v-model="filters.age"
              @change="applyFilters('age', filters.age)"
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
              v-model="filters.grade"
              @change="applyFilters('grade', filters.grade)"
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
              v-model="filters.language"
              @change="applyFilters('language', filters.language)"
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
          v-for="user in filteredUsers"
          :key="user.id"
          :user_data="user"
      />
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import User from './User'

  export default {
    name: "layout-optional",
    components: {
      User
    },
    data: () => {
      return {
        filters: {
          name: 'ALL',
          age: 'ALL',
          grade: 'ALL',
          language: 'ALL'
        },
        filteredUsers: [],
        newUser: {
          name: '',
          age: '',
          job: '',
          grade: '',
          language: ''
        }
      }
    },
    computed: {
      ...mapState([
        'users'
      ]),
      nameOptions() {
        return this.getOptions('name')
      },
      ageOptions() {
        return this.getOptions('age')
      },
      gradeOptions() {
        return this.getOptions('grade')
      },
      languageOptions() {
        return this.getOptions('language')
      }
    },
    methods: {
      ...mapActions([
        'FETCH_USERS',
        'ADD_NEW_USER'
      ]),
      getOptions(key) {
        let result = ['ALL']
        this.filteredUsers.map((item) => {
          result.push(item[key].toLowerCase())
        })
        return result = [...new Set(result)]
      },
      applyFilters(key, value) {
        if (value === 'ALL') {
          this.filteredUsers = [...this.users]
        } else {
          this.filteredUsers = this.filteredUsers.filter((item) => item[key].toLowerCase() === value)
        }
      },
      addUser() {
        let user = {
          id: this.users.length + 1,
          name: this.newUser.name,
          age: this.newUser.age,
          job: this.newUser.job,
          grade: this.newUser.grade,
          language: this.newUser.language,
        }
        this.ADD_NEW_USER(user)
        .then(() => {
          this.FETCH_USERS()
            .then(() => {
              this.filteredUsers = [...this.users]
            })
        })
      }
    },
    mounted() {
      this.FETCH_USERS()
      .then(() => {
        this.filteredUsers = [...this.users]
      })
    },
  }
</script>
