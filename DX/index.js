$(() => {
    var timeout;
  $('#scheduler').dxScheduler({
    timeZone: 'Asia/Kolkata',
    dataSource: data,
    showAllDayPanel: false,
    onCellPrepared: function (cellData) {
        if (cellData.appointmentCount > 0) {
            console.log('clicked');
            cellData.cellElement.addClass("booked-cell");
        }
        console.log('clicked');
    },
    //views: ['timelineDay', 'timelineWeek', 'month'],
    // onAppointmentFormOpening: function(data) {
    //     var form = data.form;
    //     data.cancel = true;
    // },
    // onAppointmentFormOpening: function(data) {
    //     // prevent the default popup from opening
    //     data.cancel = true;

    //     // create your custom popup
    //     var popup = $("<div>").addClass("my-custom-popup");
    //     // add input fields, buttons, etc. to the popup

    //     // show the popup to the user
    //     popup.dxPopup({
    //         title: "Create/Edit Appointment",
    //         visible: true,
    //         onHidden: function() {
    //             // destroy the popup when it's hidden
    //             popup.dxPopup("dispose");
    //         }
    //     });
    // },
    // onAppointmentClick: function(data) {
    //     // Get the clicked appointment data
    //     var appointmentData = data.appointmentData;

    //     // Create a new dxPopup widget
    //     var popup = $("<div>").dxPopup({
    //         title: "Edit Appointment",
    //         width: 400,
    //         height: 300,
    //         contentTemplate: function(contentElement) {
    //             // Add your custom popup content here, using the appointmentData variable to populate any necessary fields.
    //             contentElement.append("Custom Popup Content Goes Here");
    //         },
    //         toolbarItems: [{
    //             widget: "dxButton",
    //             options: {
    //                 text: "Save",
    //                 onClick: function() {
    //                     // Handle the save button click event here
    //                     // ...
    //                     // Close the popup
    //                     popup.dxPopup("hide");
    //                 }
    //             }
    //         }, {
    //             widget: "dxButton",
    //             options: {
    //                 text: "Cancel",
    //                 onClick: function() {
    //                     // Handle the cancel button click event here
    //                     // ...
    //                     // Close the popup
    //                     popup.dxPopup("hide");
    //                 }
    //             }
    //         }]
    //     });

    //     // Show the popup
    //     popup.dxPopup("show");
    // },
    onAppointmentFormCreated: function(e) {
        var form = e.form;
        var formItems = form.options('items');

        formItems.push({
            dataField: "location",
            editorType: "dxTextBox",
            label: {
                text: "Location"
            }
        });

        form.option({
            items: formItems,
        })
    },
    // onAppointmentRender: function(e) {
        
    // },
    onAppointmentRendered: function(e) {
        // Get the rendered appointment div element
        var $appointmentDiv = e.appointmentElement;
        // var cellElement;
        
        // Add your custom class to the div element
        $appointmentDiv.addClass("my-custom-class");
        // cellElement.addClass("my-custom-class");
    },
    onAppointmentAdded: function(e) {
        var appointment = e.appointmentData;
        var $td = $("td[data-appointment-id='" + appointment.id + "']");
        // Do something with the td element...
    },
    // onAppointmentInserting: function(e) {
    //     alert("Appointment selected");
    //     // Check if the appointment is being created
    //     if(!e.appointmentData.ID) {
    //       // Get the cell element
    //       var cellElement = e.cellElement;
    //       // Add your custom class to the cell element
    //       cellElement.addClass("my-custom-class");
    //     }
    // },
    onAppointmentRender: function (e) {
        // Get the appointment element
        var $appointmentElement = $(e.appointmentElement);

        // Add your custom class to the element
        $appointmentElement.addClass("sfs");
    },
    // onCellPrepared: function (cellData) {
    //     if (cellData.appointmentCount > 0) {
    //         cellData.cellElement.addClass("booked-cell");
    //     }
    // },
    views: [
        {
            type: "timelineDay",
            name: "Day",
            startDayHour: 0,
            endDayHour: 24,
            cellDuration: 60
        },
        {
            type: "timelineWeek",
            name: "Week",
            cellDuration: 1440, 
            firstDayOfWeek: 1,
            cellDurationUnit: "minute",
            rowHeight: 100,
            // onCellClick: function (cellData) {
            //     if (cellData.appointmentCount > 0) {
            //         cellData.cellElement.addClass("booked-cell");
            //     }
            // }
        },
        {
            type: "month",
            name: "Month",
            startDayHour: 0,
            firstDayOfWeek: 1,
            endDayHour: 24,
            // onCellClick: function (cellData) {
            //     if (cellData.appointmentCount > 0) {
            //         cellData.cellElement.addClass("booked-cell");
            //     }
            // },
            // onCellClick: function (cellData) {
            //     if (cellData.isFirstGroupCell && cellData.isFirstGroupRow && cellData.isDateCell && cellData.isWorkCell) {
            //         var newAppointment = {
            //             startDate: cellData.startDate,
            //             endDate: cellData.endDate,
            //             allDay: cellData.allDay,
            //             isNew: true // Add a custom property to indicate a new appointment
            //         };
            //         $("#scheduler").dxScheduler("instance").addAppointment(newAppointment); // Add the new appointment to the scheduler
            //         var cellElement = $("#scheduler").dxScheduler("getCellElement", cellData.cellIndex, cellData.rowIndex); // Get the cell element
            //         cellElement.addClass("new-event-cell"); // Add a custom CSS class to the cell element
            //     }
            // }
        }
    ],
    currentView: 'timelineWeek',
    currentDate: new Date(),
    startDayHour: 9,
    height: 750,
     editing: true,
    groups: ["priority"],
        resources: [{
            fieldExpr: "typeId",
            allowMultiple: false,
            dataSource: resourcesData,
            label: "Working From"
        } ],
  });
});

$(function() {
    var scheduler = $("#scheduler").dxScheduler("instance");
  
    scheduler.option("onAppointmentFormShowing", function(e) {
      e.cancel = true; // Prevent the default Scheduler popup from showing
  
      // Show the Bootstrap popup instead
      $("#myModal").modal("show");
  
      // Handle the Bootstrap popup's "Save" button click event
      $("#myModal #saveButton").on("click", function() {
        // Perform any necessary validation or data processing here
  
        // Close the Bootstrap popup
        $("#myModal").modal("hide");
  
        // Call the default Scheduler popup to save the appointment
        scheduler.showAppointmentPopup(e.appointmentData, false, e.targetedAppointmentData);
      });
    });
  });
  
$(document).ready(function(){

    $('.dx-scheduler-appointment').parent().parent().next().addClass("booked-cell");
    
});