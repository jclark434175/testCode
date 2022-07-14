public class myDMLLoop {
  	public static void myFunction() {
		List<Task> updatedTasks = new List<Task>();
        for (Task task: [Select Id, subject from Task]) {
            if (task.subject == 'foo') {
                task.subject = 'bar';
                updatedTasks.add(task);
            }
        }
        update updatedTasks;
    }
}
