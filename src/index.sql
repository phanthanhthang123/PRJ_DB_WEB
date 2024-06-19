
CREATE TABLE "KhachHang" (
    "ID" SERIAL PRIMARY KEY,
    "TenKH" VARCHAR(255),
    "SoDu" INT DEFAULT 0,
    "Email" VARCHAR(255),
    "MatKhau" VARCHAR(255),
    "GioiTinh" VARCHAR(5) DEFAULT NULL,
    "SinhNhat" DATE DEFAULT NULL,
    "SoDienThoai" VARCHAR(15) DEFAULT NULL,
    "DiaChi" TEXT DEFAULT NULL
);

insert into "KhachHang"("TenKH","Email","MatKhau") values
	('admin','admin','admin'),
	('Hoang Cong Tung','hct@gmail.com','1111111');

CREATE TABLE "NguoiDung" (
    "ID" SERIAL PRIMARY KEY,
    "TenND" VARCHAR(255),
    "SoDienThoai" VARCHAR(20),
    "Mail" VARCHAR(255),
	"MatKhau" VARCHAR(255)
);

CREATE TABLE "SanPham" (
    "ID" SERIAL PRIMARY KEY,
    "TenSP" VARCHAR(255),
    "Anh" TEXT,
    "GiaGoc" DECIMAL(10, 2),
    "GiaSale" DECIMAL(10, 2),
    "SoLuongSP" INT,
    "MoTaSP" TEXT,
    "NguoiDungID" INT  REFERENCES "NguoiDung"("ID")
);

drop table "SanPham" cascade;
insert into "SanPham" ("TenSP","GiaSale","GiaGoc","SoLuongSP","MoTaSP","Anh")
	values ('iPhone 13 128GB | Chính hãng VN/A',9,18.99,20,'iPhone 13 128GB | Chính hãng VN/A','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13_2_.png'),
	('iPhone 15 Pro Max 256GB | Chính hãng VN/A',26,34.99,20,'iPhone 15 Pro Max 256GB | Chính hãng VN/A','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png'),
	('iPhone 14 Pro Max 128GB | Chính hãng VN/A',11,29.99,20,'iPhone 14 Pro Max 128GB | Chính hãng VN/A','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png'),
	('iPhone 14 128GB  | Chính hãng VN/A',23,22.99,20,'iPhone 14 128GB  | Chính hãng VN/A','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14_1.png'),
	('Samsung Galaxy S23 Ultra 256GB',22,31.99,20,'Samsung Galaxy S23 Ultra 256GB','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23-ulatra_2__1.png'),
	('Samsung Galaxy S24 Ultra 12GB 256GB',17,33.99,20,'Samsung Galaxy S24 Ultra 12GB 256GB','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png'),
	('Samsung Galaxy Z Flip5 256GB | Chỉ có tại SHOP_PTT',35,25.99,20,'Samsung Galaxy Z Flip5 256GB','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-z-lip5_3_.png'),
	('Samsung Galaxy Z Fold5 12GB 256GB| Chỉ có tại SHOP_PTT',29,40.99,20,'Samsung Galaxy Z Fold5 12GB 256GB','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-z-fold5_2_.png'),
	('OPPO Reno11 F 5G 8GB 256GB | Chỉ có tại SHOP_PTT',35,8.99,20,'OPPO Reno11 F 5G 8GB 256GB','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-oppo-reno-11-f-2.png'),
	('Xiaomi 13T Pro 5G (12GB - 512GB) | Chỉ có tại SHOP_PTT',13,16.99,20,'Xiaomi 13T Pro 5G (12GB - 512GB)','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-13-pro-thumb-xanh-la9.jpg'),
	('Xiaomi 14 Ultra 5G (16GB 512GB)| Chỉ có tại SHOP_PTT',28,32.99,20,'Xiaomi 14 Ultra 5G (16GB 512GB)','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra_3.png'),
	('Xiaomi 14 (12GB 256GB)  | Chỉ có tại SHOP_PTT',9,22.99,20,'Xiaomi 14 (12GB 256GB)','https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-pre-xanh-la.png');
	
select * from "SanPham";

truncate table "SanPham" cascade;

CREATE TABLE "GioHang" (
    "ID" serial primary key,
    "KhachHangID" INT,
    "SanPhamID" INT,
    "SoLuong" INT,
    "Chuyen" BOOLEAN,
    "NhanVienGHID" INT,
    FOREIGN KEY ("KhachHangID") REFERENCES "KhachHang"("ID"),
    FOREIGN KEY ("SanPhamID") REFERENCES "SanPham"("ID"),
    FOREIGN KEY ("NhanVienGHID") REFERENCES "NhanVienGH"("ID")
)

CREATE TABLE "NhanVienGH" (
    "ID" SERIAL PRIMARY KEY,
    "TenNV" VARCHAR(255),
	"DiaChi" TEXT,
    "SDT" VARCHAR(20)
);
	
INSERT INTO "NhanVienGH" ("TenNV", "DiaChi", "SDT") VALUES
    ('Nguyen Van A', '123 Duong ABC, TP HCM', '0123456789'),
    ('Tran Thi B', '456 Duong XYZ, Ha Noi', '0987654321'),
	('Hoang Thi C','789 Canh DEF Ha Tinh','08752748242');
	
CREATE VIEW "SanPhamBan" AS 
SELECT *,
       ROUND("GiaGoc" * (1 - "GiaSale" / 100), 2) AS "GiaBan"
FROM "SanPham";

CREATE VIEW "SanPhamSale" AS 
SELECT *,
       ROUND("GiaGoc" * (1 - "GiaSale" / 100), 2) AS "GiaBan"
FROM "SanPham" sp
WHERE sp."GiaSale" > 25;

drop view "SanPhamBan";

drop view "SanPhamSale";
	
select sp."ID",gh."KhachHangID",sp."TenSP",sp."GiaGoc",
 round(sp."GiaGoc"*(1-sp."GiaSale"/100),2) as "GiaBan"
,sp."MoTaSP",sp."Anh",gh."SoLuong"
	from "GioHang" gh join "KhachHang" kh on (gh."KhachHangID" = kh."ID")
		join "SanPham" sp on (sp."ID" = gh."SanPhamID")
	where kh."ID" = 3;
	
-- ----------------------------------------------------------------------------------
-- 1.hien thi thong tin cac san pham duoc ban voi so luong nhieu nhat
	  
select sp."ID",
       sp."TenSP",
       sp."SoLuongSP",
       ROUND(sp."GiaGoc" * (1 - sp."GiaSale" / 100), 2) AS "GiaBan"
from "SanPham" sp 
where sp."ID" in 
    (select b1."SanPhamID"
     from (select gh."SanPhamID", sum(gh."SoLuong") as c 
           from "GioHang" gh 
           group by gh."SanPhamID") as b1
     join
     (select "SanPhamID", sum("SoLuong") as c1 
      from "GioHang" 
      group by "SanPhamID" 
      order by c1 desc 
      limit 1) as b2 
     on b1."SanPhamID" = b2."SanPhamID" and b1.c = b2.c1);

-- 2.hien thi thong tin khach hang
select *from "KhachHang";


-- 3.hien thi so luong khach hang da dat hang
select count(distinct "KhachHangID")from "GioHang";


-- 4.hien thi thong tin nhung khach hang chua dat hang
select * from "KhachHang"
where "ID" not in(
	select "KhachHangID" 
	from "GioHang");

select *
from "NhanVienGH" 

-- 5. Hiển thị thông tin nhân viên giao hàng và số đơn cần giao
select "ID", "TenNV", "SDT", "so_don" 
from "NhanVienGH" 
join (select "NhanVienGHID", count("NhanVienGHID") as so_don 
      from "GioHang" 
      group by "NhanVienGHID") as B1 
on "NhanVienGH"."ID" = B1."NhanVienGHID"
union
select "ID", "TenNV", "SDT", 0 as "so_don" 
from "NhanVienGH" 
where "ID" not in (select "NhanVienGHID" from "GioHang");

-- 6.Hien thi thong tin nv giao hang va tong so san pham can giao
select "ID","TenNV","SDT","so_sp" from "NhanVienGH" join(select "NhanVienGHID" ,sum("SoLuong") as so_sp from "GioHang" group by "NhanVienGHID" )as B1
 on "ID"="NhanVienGHID"
 union
 select *,0 from "NhanVienGH" where ID not in(select "NhanVienGHID" from  "GioHang");
 
 
--  7.Hien thi thong tin SanPham co gia goc cao nhat
 select * from "SanPham" 
 where "GiaGoc"=( select max("GiaGoc") 
				 from "SanPham");
				 
				 
--  8.Hien thi san pham co so luong bay ban nhieu nhat
 select * from "SanPham" where "SoLuongSP"=(select max("SoLuongSP") from "SanPham");
 
 
-- 9.Hien thi tong so san pham ban duoc cua nhung san pham co Gia Sale cao nhat
select "ID",
case
when "ID" not in(select "SanPhamID" from "GioHang")
then 0
else
(select sum("SoLuong") from "GioHang" where "SanPhamID"="ID")
end as TongSL
from (select "ID" from "SanPham" where "GiaSale"=(select max("GiaSale") from "SanPham"))as b1;
 
 
 -- 10.hien thi san pham theo so luong tang dan
 select * from "SanPham" order by "SoLuongSP" asc;
 
 -- 11.hien thi san pham theo so luong giam dan;
 select * from "SanPham" order by "SoLuongSP" desc;
 
 -- 12.hien thi ID  cac san pham duoc nhieu nguoi mua nhat(neu co nhieu san pham cung muc nhieu nhat thi hien thi tat ca)
 select "SanPhamID" from (select "SanPhamID",count("SanPhamID")as c from "GioHang" group by "SanPhamID")as A 
 join(select count("SanPhamID")as d from "GioHang" group by "SanPhamID" order by d desc limit 1)as B on c=d;


-- 13.Hien thi nhung don da chuyen
 select * from "GioHang" where "Chuyen"=true;
 
 
 -- 14.Hien thii nhung don chua chuyen
 select * from "GioHang" where "Chuyen"=false;
 
 
 -- 15.Hien thi nhung sanpham duoc mua nhieu hon 1 lan
 select * 
 from "SanPham" 
 where "ID" in
 	(select "SanPhamID" 
	 from "GioHang"  group by "SanPhamID" having count("SanPhamID")>1);
	 
	 
-- 16.Viet ham tinh tong so luong duoc mua cua san pham(tham so dau vao la ID san pham)

CREATE FUNCTION Sumproduct1(num INT)
RETURNS INT AS $$
DECLARE
    result INT;
BEGIN
    SELECT sum("SoLuong") INTO result
    FROM "GioHang"
    WHERE "SanPhamID" = num;
    RETURN result;
END;
$$ LANGUAGE plpgsql;


-- 17.Ham Tinh tong so tien mua hang cua 1 nguoi(tham so nhap vao la ID khachhang)
CREATE FUNCTION sumMoney(num INT)
RETURNS INT AS $$
DECLARE
    result INT;
BEGIN
    SELECT sum((1 - "GiaSale" / 100) * "GiaGoc" * "SoLuong") INTO result
    FROM "GioHang"
    JOIN "SanPham" ON "SanPhamID" = "ID"
    WHERE "KhachHangID" = num;
    RETURN result;
END;
$$ 
LANGUAGE plpgsql;

-- 18.Hien thi tong so hang ban duoc cua 1 nguoi dung(tham so dau vao la ID nguoi dung)
CREATE FUNCTION SumSellProduct(num INT)
RETURNS INT AS $$
DECLARE
    result INT;
BEGIN
    SELECT sum("SoLuong") INTO result
    FROM "SanPham"
    JOIN "GioHang" ON "SanPham"."ID" = "GioHang"."SanPhamID"
    WHERE "GioHang"."NguoiDungID" = num;
    RETURN result;
END;
$$ LANGUAGE plpgsql;


-- 19.Ham Hien thi  so luong san pham nv giao hang can giao(dau vao la ID shipper)
CREATE FUNCTION Sumdelivery(num INT)
RETURNS INT
AS $$
DECLARE
   result INT;
BEGIN
   SELECT sum("SoLuong") INTO result
   FROM "GioHang"
   WHERE "NhanVienGHID" = num;
   RETURN result;
END;
$$
LANGUAGE plpgsql;


-- 20.Dem so luong san pham co gia thap hon A(A là tham so dau vao)
CREATE FUNCTION square(num decimal(10,2))
RETURNS INT
AS $$
DECLARE
   result INT;
BEGIN
   SELECT count(*) INTO result
   FROM "SanPham"
   WHERE "GiaGoc" * (1 - "GiaSale" / 100) < num;
   RETURN result;
END;
$$
LANGUAGE plpgsql;


-- 21.Tao view hien thi gia ban cua san pham
CREATE VIEW "SanPhamBan" AS 
SELECT *,
       ROUND("GiaGoc" * (1 - "GiaSale" / 100), 2) AS "GiaBan"
FROM "SanPham";


-- 22.Tao view hien thi cac san pham giam gia sau(ten 25%)
CREATE VIEW "SanPhamSale" AS 
SELECT *,
       ROUND("GiaGoc" * (1 - "GiaSale" / 100), 2) AS "GiaBan"
FROM "SanPham" sp
WHERE sp."GiaSale" > 25;


-- 23.Tao procedure them don hang vao GioHang
CREATE FUNCTION add_order(a INT, b INT, c INT, e BOOLEAN, f INT)
RETURNS VOID
AS $$
BEGIN
    INSERT INTO "GioHang"("Column1", "Column2", "Column3", "Column4", "Column5") 
    VALUES (a, b, c, e, f);
END;
$$
LANGUAGE plpgsql;

-- 24.Tao trigger giup thay doi GiaSale theo GiaBan
CREATE TRIGGER new_sale
AFTER UPDATE ON "SanPham"
FOR EACH ROW
WHEN (NEW."GiaBan" IS DISTINCT FROM OLD."GiaBan")
EXECUTE FUNCTION update_giasale();

CREATE FUNCTION update_giasale()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW."GiaSale" := (1 - NEW."GiaBan" / NEW."GiaGoc") * 100;
  RETURN NEW;
END;
$$;



-- 25.tao trigger ngan can viec them don hang neu cua hang khong du so luong
CREATE FUNCTION check_stock() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
    SL INT;
BEGIN
    -- Lấy số lượng sản phẩm hiện có trong kho
    SELECT "SoLuongSP" INTO SL 
    FROM "SanPham"
    WHERE "ID" = NEW."SanPhamID";  
    
    -- Kiểm tra nếu số lượng sản phẩm nhỏ hơn số lượng đặt hàng
    IF SL IS NOT NULL AND SL < NEW."SoLuong" THEN  
        RAISE EXCEPTION 'Hiện tại cửa hàng không còn đủ sản phẩm';
    END IF;
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER deny_insert
BEFORE INSERT ON "GioHang"
FOR EACH ROW
EXECUTE FUNCTION check_stock();


-- 26.tao trigger giup tru di so luong san pham bay ban khi co them don hang
CREATE FUNCTION subtract_product() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
BEGIN
    -- Cập nhật số lượng sản phẩm sau khi chèn đơn hàng vào GioHang
    UPDATE "SanPham"
    SET "SoLuongSP" = "SoLuongSP" - NEW."SoLuong"
    WHERE "ID" = NEW."SanPhamID";
    
    RETURN NEW;
END;
$$;


CREATE TRIGGER subtract_product
AFTER INSERT ON "GioHang"
FOR EACH ROW
EXECUTE FUNCTION subtract_product();


-- 27.Sap xep san pham theo gia ban tang dan
select * from "SanPham" order by "GiaGoc"*(1-"GiaSale"/100) asc;


-- 28.sap xep khach hang theo so luong mua san pham giam dan
select "ID","TenKH","SDT","Mail",sl_mua from "KhachHang" join(select "KhachHangID",sum("SoLuong") as sl_mua from "GioHangID" group by "KhachHangID")as b1 on "ID"="KhachHangID"
order by sl_mua desc
union
select *,0 from "KhachHang" where "ID" not in(select "KhachHangID" from "GioHang");


-- 29.Hien thi nhung nguoi dung da ban duoc het moi san pham minh co(chi tinh th da co sp de ban)
select *from "NguoiDung" where "ID" not in(select "NguoiDungID" from "SanPham" where "ID" not in(select "SanPhamID" from "GioHang"))
and "ID" in(select "NguoiDungID" from "SanPham");


-- 30.Hien thi thong tn nhung khach hang da nhan tat ca cac don da dat
select * 
from "KhachHang" 
where "ID" in
	(select "KhachHangID" 
	 from "GioHang" 
	 where "KhachHangID" not in
	 	(select "KhachHangID" from "GioHang" where "Chuyen"=false));
