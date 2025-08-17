# Auto-generated script for BlackArch
# Generated from: blackarch.md
# Mirror ID: blackarch

check() {
	source_os_release
	[ "$NAME" = "Blackarch" ]
}

_blackarch_install_1() {
	# 一键替换Alpine Linux软件源
	set_sudo

	if [ -f /etc/pacman.conf ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/blackarch__etc_pacman.conf.bak ] || $sudo cp /etc/pacman.conf ${_backup_dir}/blackarch__etc_pacman.conf.bak || {
			print_error "Backup /etc/pacman.conf failed"
			return 1
		}
		$sudo  sed -i -E -e "$a\\[blackarch]\nServer = ${_http}://${_domain}/blackarch/$repo/os/$arch" /etc/pacman.conf || {
			print_error "Failed to update /etc/pacman.conf"
			return 1
		}
	else
		print_warning "File /etc/pacman.conf does not exist"
	fi

	return 0
}

_blackarch_install_2() {
	# 安装密钥
	set_sudo

	# Execute commands
	$sudo pacman -Sy blackarch-keyring

	return 0
}

_blackarch_install_3() {
	# 更新缓存
	set_sudo

	# Execute commands
	$sudo pacman -Syyu

	return 0
}

install() {

	_blackarch_install_1 || return 1
	_blackarch_install_2 || return 1
	_blackarch_install_3 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/blackarch__etc_pacman.conf.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/blackarch__etc_pacman.conf.bak" /etc/pacman.conf 2>/dev/null || true
		print_info "Restored /etc/pacman.conf"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/blackarch__etc_pacman.conf.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/pacman.conf ] && grep -q "$domain" /etc/pacman.conf 2>/dev/null && return 0
	return 1
}
