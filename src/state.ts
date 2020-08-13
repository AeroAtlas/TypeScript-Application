namespace App { 
  //State Management
  export type Listener<T> = (items: T[]) => void;

  export class State<T> {
    protected listeners: Listener<T>[] = [];

    //Add listener functions to array
    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    //Turn this class into a singleton
    static getInstance() {
      if (this.instance) {
        return this.instance
      }
      this.instance = new ProjectState();
      return this.instance;
    }


    //Add project object to the projects list
    public addProject(title:string, desc: string, people: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        desc,
        people,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    //Move project using state to switch enum value
    public moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(prj => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }

    //Updates the listeners
    private updateListeners() {
      for (const listenerFn of this.listeners) {
        //make new reference for each listener (slice())
        listenerFn(this.projects.slice()); 
      }
    }
  }
}