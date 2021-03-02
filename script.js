var page=1;
getList();
$("#btnNext").on("click", function(){
    page++;
    getList();
});

$("#btnPre").on("click", function(){
    page--;
    getList();
});

$("#btnSearch").on("click", function(){
    page=1;
    getList();
});

$("#txtQuery").on("keydown", function(){
    page=1;
    getList();
});

$("#selSize").on("change", function(){
    page=1;
    getList();
});

function getList(){
    var query=$("#txtQuery").val();
    var size=$("#selSize").val();
    $.ajax({
        type:"get",
        url:url,
        headers:{"Authorization": "KakaoAK a424b6c713a8f18cd4f766292f180c40"},
        dataType:"json",
        data:{"query":query, "size":size, "page":page},
        success:function(data){
            var is_end=data.meta.is_end;
            var temp=Handlebars.compile($("#temp").html());
            $("#tblBlog").html(temp(data));
            $("#page").html(" 현재: "+page+" / 전체: "+Math.ceil(data.meta.pageable_count/size)+"");
            $("#total").html(data.meta.pageable_count+"건");
            if(page==1){
                $("#btnPre").attr("disabled", true);
            }else{
                $("#btnPre").attr("disabled", false);
            }
            if(id_end){
                $("#btnNext").attr("disabled", true);
            }else{
                $("#btnNext").attr("disabled", false);
            }
        }
    })
}