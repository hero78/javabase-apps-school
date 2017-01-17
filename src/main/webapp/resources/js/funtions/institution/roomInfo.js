
/*
 * registration function with jquery ajax 
 */
$(document).ready(function($) {
//	call building info initialized method
	getBildingInfo();
	getRoomUsedData();
	
	/*
	 * Room datatable
	 * 
	 */
	roomDatatable();
	
	//insert room info data
	$("#addNewRoomForm").submit(function(event) {
		
		event.preventDefault();
		var data = {}
		data["buildingId"]       = $("#buildingId").val(),
		data["roomUsedId"] 	     = $("#roomUsedId").val(),
		data["floorNo"] 	     = $("#floorNo").val(),
		data["roomName"]         = $("#roomName").val(),
		data["roomNo"] 	         = $("#roomNo").val(),
		data["totalSeat"]  		 = $("#totalSeat").val(),
		data["size"] 	         = $("#size").val(),
		data["usedFor"] 	     = $("#usedFor").val(),
		url = "room/addNewRoom";
		
		
		var token = $('#csrfToken').val();
		var header = $('#csrfHeader').val();
		/*	
		 * if in spring aplication csrf enable
		 * send csrf parameter in header otherwise 405 error
		 */
		$.ajax({
			type 	 : "POST",
			url      : url,
			data 	 : JSON.stringify(data),
			dataType : 'json',
			beforeSend: function(xhr) {
		        xhr.setRequestHeader("Accept", "application/json");
		        xhr.setRequestHeader("Content-Type", "application/json");
		        xhr.setRequestHeader(header, token);
		    },
			success  : function(resonse) {
				success(resonse.message);
				roomDatatable();
				document.getElementById("addNewRoomForm").reset()
			},
			error 	 : function(e) {
				console.log("ERROR: ",e);
				alert("Insert falied");
				document.getElementById("addNewRoomForm").reset()
			}
		});
		
	});
	
	/*
	 * Datable get room function
	 */
	function roomDatatable() {
		$.ajax({
			type 	 : "GET",
			url      : "room/load",
			success  : function(resonse) {
				var data = resonse.data;
				
				$("#roomTable").dataTable({
					destroy	: true,
			        "data"	: data,
			        columns	: [{
				        	title	: 'Room Id',
				        	data	: 'ioomId'
						},{
							title	: 'Room Name',
							data	: 'roomName'
						},{
							title	: 'Room No',
							data	: 'roomNo'
						},{
							title	: 'Seat',
							data	: 'totalSeat'
				    	},{
				    		title	: 'Room Used',
				    		data	: 'usedFor'
				    	},{
				    		title	: 'Date',
				    		data	: 'entryDate'
				    	}
			        ]
			    });
			},
			error 	 : function(e) {
				console.log(e);
			}
		});
	};
});