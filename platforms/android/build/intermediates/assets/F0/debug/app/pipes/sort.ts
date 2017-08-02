import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: "sort",
    pure: false
})
export class Sort implements PipeTransform {
    transform(value: any[]): any {
        return value.reverse();
    }
}
