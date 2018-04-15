

var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDes = args.join(' ');
var file = path.join(process.cwd(), '/.tasks');

switch (command) {
    case 'list':
        listTasks(file);
        break;
    case 'add':
        addTasks(file, taskDes);
        break;
    default:
        console.log(process.argv[0] );
}

// 读取任务文件
function loadOrInitializeTaskArray(file, cb) {
    fs.exists(file, function (exists) {
        var tasks = [];
        if (exists) {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    throw err;
                }
                var data = data.toString();
                var task = JSON.parse(data || '[]');
                cb(task);
            });
        } else {
            cb([]);
        }
    })
}

// 展示任务
function listTasks(file) {
    loadOrInitializeTaskArray(file, function (data) {
        for (var key in data) {
            console.log(data[key]);
        }
    });
}

// 将任务保存到磁盘
function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), 'utf8', function (err) {
        if (err) {
            throw err;
        }
        console.log('saved');
    });
}

// 添加文件
function addTasks(file, taskDes) {
    loadOrInitializeTaskArray(file, function (tasks) {
        tasks.push(taskDes);
        storeTasks(file, tasks);
    });
}


/**
 * process.argv 启动node进程时，命令行的参数
 */