use automatiza_varejo;
alter table customer drop foreign key FK_170a73f2523d7ca266834e38ef1;
alter table customer drop foreign key FK_352ac9084e066e86c63eba2f268;
alter table customer_permissions drop foreign key FK_23f5d6607a2a0cac461932e4b96;
alter table customer_permissions drop foreign key FK_5dfb3c4757ba3c09d39811f896e;
alter table roles_customer drop foreign key FK_7ed01c562327f0fecc4accd835d;
alter table roles_customer drop foreign key FK_e4ac8f86ba877242ecf0b98745d;
alter table customer_permissions drop index IDX_23f5d6607a2a0cac461932e4b9;
alter table customer_permissions drop index IDX_5dfb3c4757ba3c09d39811f896;
alter table roles_customer drop index IDX_7ed01c562327f0fecc4accd835;
alter table roles_customer drop index IDX_e4ac8f86ba877242ecf0b98745;