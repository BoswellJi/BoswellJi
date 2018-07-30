// {/* <script> */}
    function Queue() {
        var items = [];
        this.enqueue = function (el) {
            items.push(el);
        }

        this.dequeue = function () {
            return items.shift();
        }

        this.front = function () {
            return items[0];
        }

        this.isEmpty = function () {
            return items.length === 0
        }

        this.size=function(){
            return items.length;
        }
    }
// {/* </script> */}