"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Sort = (function () {
    function Sort() {
    }
    Sort.prototype.transform = function (value) {
        return value.reverse();
    };
    return Sort;
}());
Sort = __decorate([
    core_1.Pipe({
        name: "sort",
        pure: false
    })
], Sort);
exports.Sort = Sort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Q7QUFNcEQsSUFBYSxJQUFJO0lBQWpCO0lBSUEsQ0FBQztJQUhHLHdCQUFTLEdBQVQsVUFBVSxLQUFZO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLElBQUk7SUFKaEIsV0FBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsS0FBSztLQUNkLENBQUM7R0FDVyxJQUFJLENBSWhCO0FBSlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBQaXBlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQFBpcGUoe1xuICAgIG5hbWU6IFwic29ydFwiLFxuICAgIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIFNvcnQgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueVtdKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJldmVyc2UoKTtcbiAgICB9XG59XG4iXX0=