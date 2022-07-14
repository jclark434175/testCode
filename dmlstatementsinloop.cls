public class myDMLLoop {
    public static void myFunction() {
        for (Task task: [Select Id, subject from Task]) {
            if (task.subject == 'foo') {
                task.subject = 'bar';
                update task; // Noncompliant
            }
        }
    }
}
// Query in a while loop
public class myDMLLoop {
    public static void myFunction(Task[] tasks) {
        Integer i = 0;
        while ( i < 1000) {
            Task task = tasks[i];
            if (task.subject == 'foo') {
                task.subject = 'bar';
                update task; // Noncompliant
            }
        }
    }
}

// Query in a do-while loop
public class myDMLLoop {
    public static void myFunction(Task[] tasks) {
        Integer i = 0;
        do {
            Task task = tasks[i];
            if (task.subject == 'foo') {
                task.subject = 'bar';
                update task; // Noncompliant
            }
            i++;
        } while (i < 1000);
    }
}
