const dataset1 = {
  workerData: {
    name: "John Smith",
    id: "WS001",
    date: "2024-04-18",
    project: "Building Construction"
  },
  tasksData: [
    {
      name: "Foundation Work",
      description: "Concrete pouring and leveling",
      status: "Completed",
      comments: "All foundation work completed on schedule"
    },
    {
      name: "Wall Construction",
      description: "Brick laying and plastering",
      status: "In Progress",
      comments: "50% of walls completed"
    },
    {
      name: "Electrical Work",
      description: "Wiring and fixture installation",
      status: "Pending",
      comments: "Scheduled for next week"
    }
  ],
  signatureData: {
    supervisor: "Michael Johnson",
    date: "2024-04-18",
    worker: "John Smith"
  }
};

const dataset2 = {
  workerData: {
    name: "Sarah Williams",
    id: "WS002",
    date: "2024-04-18",
    project: "Road Construction"
  },
  tasksData: [
    {
      name: "Excavation",
      description: "Ground leveling and preparation",
      status: "Completed",
      comments: "Area cleared and leveled"
    },
    {
      name: "Asphalt Laying",
      description: "Base layer installation",
      status: "In Progress",
      comments: "30% of base layer completed"
    },
    {
      name: "Marking",
      description: "Road marking and signage",
      status: "Pending",
      comments: "To be done after asphalt work"
    }
  ],
  signatureData: {
    supervisor: "Robert Brown",
    date: "2024-04-18",
    worker: "Sarah Williams"
  }
};

module.exports = { dataset1, dataset2 }; 