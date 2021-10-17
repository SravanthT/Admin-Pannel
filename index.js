$(document).ready(() => {
    var ResponseData;
    console.log("its ready")
   
    $.get('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D', (response) => {
    ResponseData = response  
    render(ResponseData)
    })

    function render(response){
        response.map(({ id, firstName, lastName, email, phone,address,description}) => {
            var RowCreate = $("<tr>").attr("id", id).addClass("data-row")
            RowCreate.append($("<td>").text(id).addClass("column1"),
                $("<td>").text(firstName).addClass("column2"),
                $("<td>").text(lastName).addClass("column3"),
                $("<td>").text(email).addClass("column4"),
                $("<td>").text(phone).addClass("column5"),
            )
            $("#tabular").append(RowCreate)
            RowCreate.click(() => {
                $(".data-row").removeClass("active")
                $("#"+id).addClass("active")
                $("#details-name").text(firstName+" "+lastName)
                $("textarea").text(description)
                
                   $("#info-content>div:nth-of-type(3)>span").text(address.streetAddress);
                   $("#info-content>div:nth-of-type(4)>span").text(address.city);
                   $("#info-content>div:nth-of-type(5)>span").text(address.state);
                   $("#info-content>div:nth-of-type(6)>span").text(address.zip);
                
            })
        })
    }
   

    $("#search-box").on("input",function(e){
        e.preventDefault()
        let searchText = $(this).val().toLowerCase()
        if (searchText.length == 0){

            $("#tabular")[0].innerHTML = ''
            render(ResponseData)
            
        }
        if (searchText.length >= 1){
            searchCall(searchText)
            }
        
    });
    
    function searchCall(text){
       let datafiltered = [];
       for (let i=0;i<ResponseData.length;i++){
        if(ResponseData[i].firstName.includes(text) === true){
            datafiltered.push(ResponseData[i])
        }
       }
       $("#tabular")[0].innerHTML = ''
       render(datafiltered)
        }
})