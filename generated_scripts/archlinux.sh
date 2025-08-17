# Auto-generated script for Arch Linux
# Generated from: archlinux.md
# Mirror ID: arch-linux

check() {
	source_os_release
	[ "$NAME" = "Arch Linux" ]
}

_arch-linux_install_1() {
	# 一键替换Alpine Linux软件源
	set_sudo

	if [ -f /etc/pacman.d/mirrorlist ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/arch-linux__etc_pacman.d_mirrorlist.bak ] || $sudo cp /etc/pacman.d/mirrorlist ${_backup_dir}/arch-linux__etc_pacman.d_mirrorlist.bak || {
			print_error "Backup /etc/pacman.d/mirrorlist failed"
			return 1
		}
		$sudo  sed -i -E -e "1i\\Server = ${_http}://${_domain}/archlinux/$repo/os/$arch" /etc/pacman.d/mirrorlist || {
			print_error "Failed to update /etc/pacman.d/mirrorlist"
			return 1
		}
	else
		print_warning "File /etc/pacman.d/mirrorlist does not exist"
	fi

	return 0
}

_arch-linux_install_2() {
	# 更新软件包索引
	set_sudo

	# Execute commands
	$sudo pacman -Syyu

	return 0
}

install() {

	_arch-linux_install_1 || return 1
	_arch-linux_install_2 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/arch-linux__etc_pacman.d_mirrorlist.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/arch-linux__etc_pacman.d_mirrorlist.bak" /etc/pacman.d/mirrorlist 2>/dev/null || true
		print_info "Restored /etc/pacman.d/mirrorlist"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/arch-linux__etc_pacman.d_mirrorlist.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/pacman.d/mirrorlist ] && grep -q "$domain" /etc/pacman.d/mirrorlist 2>/dev/null && return 0
	return 1
}
