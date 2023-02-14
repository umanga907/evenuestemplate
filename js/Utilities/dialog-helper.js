var MessageBoxType;
(function (MessageBoxType) {
    MessageBoxType[MessageBoxType["Information"] = 1] = "Information";
    MessageBoxType[MessageBoxType["Warning"] = 2] = "Warning";
    MessageBoxType[MessageBoxType["Error"] = 3] = "Error";
})(MessageBoxType || (MessageBoxType = {}));
;
var MessageBoxButtons;
(function (MessageBoxButtons) {
    MessageBoxButtons[MessageBoxButtons["OK"] = 1] = "OK";
    MessageBoxButtons[MessageBoxButtons["Cancel"] = 2] = "Cancel";
    MessageBoxButtons[MessageBoxButtons["Close"] = 3] = "Close";
    MessageBoxButtons[MessageBoxButtons["OkAndCancel"] = 4] = "OkAndCancel";
})(MessageBoxButtons || (MessageBoxButtons = {}));
;
var MessageBoxResults;
(function (MessageBoxResults) {
    MessageBoxResults[MessageBoxResults["OK"] = 1] = "OK";
    MessageBoxResults[MessageBoxResults["Cancel"] = 2] = "Cancel";
    MessageBoxResults[MessageBoxResults["Close"] = 3] = "Close";
})(MessageBoxResults || (MessageBoxResults = {}));
;
var MessageBox = /** @class */ (function () {
    function MessageBox() {
    }
    MessageBox.prototype.show = function (message, title, messageBoxType, messageBoxButtons) {
        if (typeof (title) == 'undefined' || title == null) {
            title = "Message Box";
        }
        var dialog = "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" id=\"MessageBox\">";
        dialog += "<div class=\"modal-dialog\">";
        dialog += "<div class=\"modal-content\">";
        dialog += "<div class=\"modal-header\">";
        //dialog += "<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\" >&times;</span></button>";
        dialog += "<button type=\"button\" class=\"close\" onclick=\"" + this.close() + "\" aria-label=\"Close\"><span aria-hidden=\"true\" >&times;</span></button>";
        dialog += "<h4 class=\"modal-title\">" + title + "</h4>";
        dialog += "</div>";
        dialog += "<div class=\"modal-body\">";
        dialog += message;
        dialog += "</div>";
        dialog += "<div class=\"modal-footer\">";
        dialog += "<button type=\"button\" class=\"btn btn-sm btn-default\" data-bs-dismiss=\"modal\"> Close </button>";
        dialog += "<button type= \"button\" class=\"btn btn-sm btn-primary\" > Save changes</button>";
        dialog += "</div>";
        dialog += "</div>";
        dialog += "</div>";
        dialog += "</div>";
        //document.body.appendChild(dialog);
        //$("body").append(dialog);
        //$('#MessageBox').modal('show')
        return MessageBoxResults.OK;
    };
    MessageBox.prototype.close = function () {
        alert('Hi');
        //$('#MessageBox').modal('hide')
        //$("#MessageBox").remove();
        //event.preventDefault();
    };
    MessageBox.prototype.getPanelHeaderStyle = function (messageBoxType) {
        switch (messageBoxType) {
            case MessageBoxType.Information:
                return 'panel-success';
            case MessageBoxType.Error:
                return 'panel-danger';
            case MessageBoxType.Warning:
                return 'panel-warning';
        }
        return 'panel-default';
    };
    return MessageBox;
}());
//module ContentModule {
//    class LanguageResourceViewModel {
//        Id: number;
//        Name: string;
//        Description: string;
//    }
//    //export class LanguageResourceController {
//    //    LoadData(data) {
//    //        debugger;
//    //        $("#listTable").find("tr:gt(1)").remove();
//    //        $.each(data, function (key, val) {
//    //            var tableRow = '<tr>' +
//    //                '<td>' + val.Id + '</td>' +
//    //                '<td><input type="text" value="' + val.Name + '"/></td>' +
//    //                '<td><input type="text" value="' + val.Description + '"/></td>' +
//    //                '<td><input type="button" name="UpdateButton" value="Update" /> <input type="button" name="DeleteButton" value="Delete" /></td>' +
//    //                '</tr>';
//    //            $('#listTable').append(tableRow);
//    //        });
//    //        $("input[name='InsertButton']").click(function () {
//    //            var id = $("#Id").val();
//    //            var name = $("#Name").val();
//    //            var description = $("#Description").val();
//    //            var languageResource = new ContentModule.LanguageResourceService();
//    //            languageResource.Id = id;
//    //            languageResource.Name = name;
//    //            languageResource.Description = description;
//    //            languageResource.Create(function () {
//    //                $("#Id").val('');
//    //                $("#Name").val('');
//    //                $("#Description").val('');
//    //                alert('Added !');
//    //            });
//    //        });
//    //        $("input[name='UpdateButton']").click(function () {
//    //            var cell;
//    //            var id = $(this).parent().parent().children().get(0).innerHTML;
//    //            cell = $(this).parent().parent().children().get(1);
//    //            var name = $(cell).find('input').val();
//    //            cell = $(this).parent().parent().children().get(2);
//    //            var description = $(cell).find('input').val();
//    //            var languageResource = new ContentModule.LanguageResourceService();
//    //            languageResource.Id = id;
//    //            languageResource.Name = name;
//    //            languageResource.Description = description;
//    //            languageResource.Update(function () {
//    //                alert('Customer Updated !');
//    //            });
//    //        });
//    //        $("input[name='DeleteButton']").click(function () {
//    //            var id = $(this).parent().parent().children().get(0).innerHTML;
//    //            var data = '{"id":"' + id + '"}';
//    //            var row = $(this).parent().parent();
//    //            var languageResourceService = new ContentModule.LanguageResourceService();
//    //            languageResource.Id = id;
//    //            languageResource.Delete(function () {
//    //                alert('Customer Deleted !');
//    //            });
//    //        });
//    //    }
//    //}
//    export class LanguageResourceController {
//        _languageResourceService: LanguageResourceService;
//        constructor(languageResourceService : LanguageResourceService) {
//            this._languageResourceService = languageResourceService
//        }
//        GetAll(): LanguageResourceViewModel[] {
//            return this._languageResourceService.GetAll();
//        }
//        Create(viewModel: LanguageResourceViewModel, callback: any): number {
//            return this._languageResourceService.Create(viewModel, callback);
//        }
//        Update(viewModel: LanguageResourceViewModel, callback: any): number {
//            return this._languageResourceService.Update(viewModel, callback);
//        }
//        Delete(id: number, callback: any): number {
//            return this._languageResourceService.Delete(id, callback);
//        }
//    }
//    export class LanguageResourceService {
//        constructor() { }
//        GetAll(): LanguageResourceViewModel[] {
//            debugger;
//            var data = $.getJSON("http://localhost:22407/api/languageResourceService");
//            var viewModels = new Array<LanguageResourceViewModel>();
//            $.each(data, function (key, val) {
//                var viewModel = new LanguageResourceViewModel();
//                viewModel.Id = data.Id;
//                viewModel.Name = data.Name;
//                viewModel.Description = data.Description;
//                viewModels.push(viewModel);
//            });
//            return viewModels;
//            //$.ajax({
//            //    type: 'GET',
//            //    url: 'http://localhost:22407/api/languageResourceService',
//            //    //data: data,
//            //    contentType: "application/json; charset=utf-8",
//            //    dataType: 'json',
//            //    success: callback,
//            //    error: function (xhr, err) {
//            //        alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
//            //        alert("responseText: " + xhr.responseText);
//            //    }
//            //});
//        }
//        Create(viewModel: LanguageResourceViewModel, callback: any): number {
//            var data = '{"Id":"' + viewModel.Id + '","Name":"' + viewModel.Name + '","Description":"' + viewModel.Description + '"}';
//            $.ajax({
//                type: 'POST',
//                url: 'http://localhost:22407/api/languageResourceService/',
//                data: data,
//                contentType: "application/json; charset=utf-8",
//                dataType: 'json',
//                success: callback,
//                error: function () { alert('Error'); }
//            });
//            return 0;
//        }
//        Update(viewModel: LanguageResourceViewModel,callback: any): number {
//            var data = '{"Id":"' + viewModel.Id + '","Name":"' + viewModel.Name + '","Description":"' + viewModel.Description + '"}';
//            $.ajax({
//                type: 'PUT',
//                url: 'http://localhost:22407/api/languageResourceService',
//                data: data,
//                contentType: "application/json; charset=utf-8",
//                dataType: 'json',
//                success: callback,
//                error: function (xhr, err) {
//                    alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
//                    alert("responseText: " + xhr.responseText);
//                }
//            });
//            return 0;
//        }
//        Delete(id: number, callback: any): number {
//            var data = "{\"Id\":id}";
//            $.ajax({
//                type: 'DELETE',
//                url: 'http://localhost:22407/api/languageResourceService',
//                data: data,
//                contentType: "application/json; charset=utf-8",
//                dataType: 'json',
//                success: callback,
//                error: function (xhr, err) {
//                    alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
//                    alert("responseText: " + xhr.responseText);
//                }
//            });
//            return 0;
//        }
//        //loggingIdentity<T>(arg: T[]): T[] {
//        //    console.log(arg.length);  // Array has a .length, so no more error
//        //    return arg;
//        //}
//    }
//}
//# sourceMappingURL=dialog-helper.js.map