
export const ALL_PAGE_OBJ = {
  users: {
    path: 'users',
    data: {
      menu: {
        title: '用户管理',
        icon: 'team'
      }
    },
    children: [{
      path: 'users-list',
      data: {
        menu: {
          title: '用户一览'
        }
      }
    }, {
      path: 'role-list',
      data: {
        menu: {
          title: '角色列表'
        }
      }
    }/*, {
      path: 'department-list',
      data: {
        menu: {
          title: '部门列表'
        }
      }
    }*/]
  },


  course: {
    path: 'course',
    data: {
      menu: {
        title: '课程管理',
        icon: 'team'
      }
    },
    children: [{
      path: 'course-list',
      data: {
        menu: {
          title: '课程管理'
        }
      }
    },
      {
        path: 'grade-list',
        data: {
          menu: {
            title: '班级分类'
          }
        }
      },
      {
        path: 'coursesubject-list',
        data: {
          menu: {
            title: '科目一览'
          }
        }
      },
      {
      path: 'coursereserve-list',
      data: {
        menu: {
          title: '课程预约'
        }
      }
    }, {
    path: 'curriculum-list',
    data: {
    menu: {
      title: '课程表'
     }
    }
  } ]
  },







  // 教师管理
  teacher: {
    path: 'teacher',
    data: {
      menu: {
        title: '教师管理',
        icon: 'team'
      }
    },
    children: [{
      path: 'teacher-list',
      data: {
        menu: {
          title: '教师信息'
        }
      }
    }, {
      path: 'teacher-deposit',
      data: {
        menu: {
          title: '托管教师'
        }
      }
    }]
  },
    // 学员管理
  student: {
      path: 'student',
      data: {
        menu: {
          title: '学员管理',
          icon: 'team'
        }
      },
      children: [{
        path: 'student-list',
        data: {
          menu: {
            title: '学员信息'
          }
        }
      }, {
        path: 'student-deposit',
        data: {
          menu: {
            title: '学员托管'
          }
        }
      }]
    },
  // 通知管理
  notice: {
    path: 'notice',
    data: {
      menu: {
        title: '通知管理',
        icon: 'team'
      }
    },
    children: [{
      path: 'notice-list',
      data: {
        menu: {
          title: '通知信息'
        }
      }
    }]
  },
  // 教室管理
  classroom: {
      path: 'classroom',
      data: {
        menu: {
          title: '教室管理',
          icon: 'team'
        }
      },
      children: [{
        path: 'classroom-list',
        data: {
          menu: {
            title: '教室信息'
          }
        }
      }]
    },
  dashboard: {
    path: 'dashboard',
    data: {
      menu: {
        title: 'Dashboard',
        icon: 'user'
      }
    },
    children: [{
      path: 'analysis',
      data: {
        menu: {
          title: '分析页'
        }
      }
    }, {
      path: 'monitor',
      data: {
        menu: {
          title: '监控页'
        }
      }
    }, {
      path: 'workplace',
      data: {
        menu: {
          title: '工作台'
        }
      }
    }]
  },
  form: {
    path: 'form',
    data: {
      menu: {
        title: '表单页',
        icon: 'file-add'
      }
    },
    children: [{
      path: 'basic-form',
      data: {
        menu: {
          title: '基础表单'
        }
      }
    }, {
      path: 'step-form',
      data: {
        menu: {
          title: '分步表单'
        }
      }
    }, {
      path: 'advanced-form',
      data: {
        menu: {
          title: '高级表单'
        }
      }
    }]
  },
  list: {
    path: 'list',
    data: {
      menu: {
        title: '列表页',
        icon: 'layout'
      }
    },
    children: [{
      path: 'query-list',
      data: {
        menu: {
          title: '查询列表'
        }
      }
    }, {
      path: 'standard-list',
      data: {
        menu: {
          title: '标准列表'
        }
      }
    }, {
      path: 'card-list',
      data: {
        menu: {
          title: '卡片列表'
        }
      }
    }, {
      path: 'search-list',
      data: {
        menu: {
          title: '搜索列表'
        }
      }
    }]
  },
  profile: {
    path: 'profile',
    data: {
      menu: {
        title: '详情页',
        icon: 'file-text'
      }
    },
    children: [{
      path: 'basic-detail',
      data: {
        menu: {
          title: '基础详情页'
        }
      }
    }, {
      path: 'advanced-detail',
      data: {
        menu: {
          title: '高级详情页'
        }
      }
    }]
  },
  result: {
    path: 'result',
    data: {
      menu: {
        title: '结果页',
        icon: 'check-circle-o'
      }
    },
    children: [{
      path: 'success',
      data: {
        menu: {
          title: '成功'
        }
      }
    }, {
      path: 'error',
      data: {
        menu: {
          title: '失败'
        }
      }
    }]
  },
  exception: {
    path: 'exception',
    data: {
      menu: {
        title: '异常页',
        icon: 'exception'
      }
    },
    children: [{
      path: '403',
      data: {
        menu: {
          title: '403'
        }
      }
    },
    {
      path: '404',
      data: {
        menu: {
          title: '404'
        }
      }
    },
    {
      path: '500',
      data: {
        menu: {
          title: '500'
        }
      }
    }]
  },
  style: {
    path: 'style',
    data: {
      menu: {
        title: '样式页',
        icon: 'code-o'
      }
    },
    children: [{
      path: 'common-style',
      data: {
        menu: {
          title: '通用样式'
        }
      }
    }]
  },
};
