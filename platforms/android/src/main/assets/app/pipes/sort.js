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
        name: 'sort',
        pure: false
    })
], Sort);
exports.Sort = Sort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Q7QUFNcEQsSUFBYSxJQUFJO0lBQWpCO0lBSUEsQ0FBQztJQUhHLHdCQUFTLEdBQVQsVUFBVSxLQUFZO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLElBQUk7SUFKaEIsV0FBSSxDQUFDO1FBQ0YsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsS0FBSztLQUNkLENBQUM7R0FDVyxJQUFJLENBSWhCO0FBSlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnc29ydCcsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgU29ydCBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55W10pOiBhbnkge1xuICAgICAgICByZXR1cm4gdmFsdWUucmV2ZXJzZSgpO1xuICAgIH1cbn1cbiJdfQ==